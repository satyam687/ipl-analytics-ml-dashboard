from rest_framework import serializers
from .models import Season, PlayerSeasonStat, Match

class PlayerSeasonStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerSeasonStat
        fields = '__all__'

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'

class SeasonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = [
            'id', 'year', 'winner_team', 'winner_code', 'runner_up', 
            'orange_cap_player', 'orange_cap_runs', 'purple_cap_player', 
            'purple_cap_wickets', 'total_sixes', 'total_fours', 'total_runs', 'theme_color'
        ]

class SeasonDetailSerializer(serializers.ModelSerializer):
    player_stats = PlayerSeasonStatSerializer(many=True, read_only=True)
    matches = MatchSerializer(many=True, read_only=True)
    top_sixes = serializers.SerializerMethodField()
    top_fours = serializers.SerializerMethodField()
    top_runs = serializers.SerializerMethodField()
    top_wickets = serializers.SerializerMethodField()
    run_progression = serializers.SerializerMethodField()

    class Meta:
        model = Season
        fields = '__all__'

    def get_top_sixes(self, obj):
        stats = obj.player_stats.order_by('-sixes')[:10]
        return PlayerSeasonStatSerializer(stats, many=True).data

    def get_top_fours(self, obj):
        stats = obj.player_stats.order_by('-fours')[:10]
        return PlayerSeasonStatSerializer(stats, many=True).data

    def get_top_runs(self, obj):
        stats = obj.player_stats.order_by('-runs')[:10]
        return PlayerSeasonStatSerializer(stats, many=True).data

    def get_top_wickets(self, obj):
        stats = obj.player_stats.order_by('-wickets')[:10]
        return PlayerSeasonStatSerializer(stats, many=True).data

    def get_run_progression(self, obj):
        matches = obj.matches.order_by('match_number')
        data = []
        for m in matches:
            data.append({
                'match': f"M{m.match_number}",
                'match_stage': m.match_stage,
                'team1': m.team1,
                'team2': m.team2,
                'team1_runs': m.team1_runs,
                'team2_runs': m.team2_runs,
                'total_match_runs': m.team1_runs + m.team2_runs,
                'winner': m.winner,
            })
        return data
