from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Sum, Count, Max

from .models import Season, PlayerSeasonStat, Match
from .serializers import SeasonListSerializer, SeasonDetailSerializer, PlayerSeasonStatSerializer
from .ml_engine import ml_engine
from .matplotlib_engine import generate_season_matplotlib_charts

class SeasonListView(APIView):
    def get(self, request):
        seasons = Season.objects.all().order_by('year')
        serializer = SeasonListSerializer(seasons, many=True)
        return Response({
            'count': seasons.count(),
            'seasons': serializer.data
        })

class SeasonDetailView(APIView):
    def get(self, request, year):
        season = get_object_or_404(Season, year=year)
        serializer = SeasonDetailSerializer(season)
        data = serializer.data
        
        # Include Matplotlib base64 charts
        player_stats = season.player_stats.all()
        matches = season.matches.all()
        charts = generate_season_matplotlib_charts(season, player_stats, matches)
        data['matplotlib_charts'] = charts
        
        return Response(data)

class MatchPredictorView(APIView):
    def post(self, request):
        team1 = request.data.get('team1', 'Chennai Super Kings')
        team2 = request.data.get('team2', 'Mumbai Indians')
        toss_winner = request.data.get('toss_winner', team1)
        toss_decision = request.data.get('toss_decision', 'Bat')
        venue = request.data.get('venue', 'Wankhede Stadium, Mumbai')
        year = int(request.data.get('year', 2026))

        result = ml_engine.predict_match(team1, team2, toss_winner, toss_decision, venue, year)
        return Response(result)

    def get(self, request):
        team1 = request.GET.get('team1', 'Chennai Super Kings')
        team2 = request.GET.get('team2', 'Mumbai Indians')
        toss_winner = request.GET.get('toss_winner', team1)
        toss_decision = request.GET.get('toss_decision', 'Bat')
        venue = request.GET.get('venue', 'Wankhede Stadium, Mumbai')
        year = int(request.GET.get('year', 2026))

        result = ml_engine.predict_match(team1, team2, toss_winner, toss_decision, venue, year)
        return Response(result)

class IPLAnalyticsOverviewView(APIView):
    def get(self, request):
        # Calculate title counts per team
        seasons = Season.objects.all()
        titles_count = {}
        for s in seasons:
            titles_count[s.winner_team] = titles_count.get(s.winner_team, 0) + 1

        titles_list = [{'team': k, 'titles': v} for k, v in sorted(titles_count.items(), key=lambda x: x[1], reverse=True)]

        # Overall top six hitters all time (2008-2026)
        all_time_sixes = (
            PlayerSeasonStat.objects.values('player_name')
            .annotate(
                total_sixes=Sum('sixes'),
                total_fours=Sum('fours'),
                total_runs=Sum('runs'),
                seasons_count=Count('season', distinct=True)
            )
            .order_by('-total_sixes')[:10]
        )

        # Overall top fours hitters
        all_time_fours = (
            PlayerSeasonStat.objects.values('player_name')
            .annotate(
                total_sixes=Sum('sixes'),
                total_fours=Sum('fours'),
                total_runs=Sum('runs')
            )
            .order_by('-total_fours')[:10]
        )

        # Overall top run scorers
        all_time_runs = (
            PlayerSeasonStat.objects.values('player_name')
            .annotate(
                total_runs=Sum('runs'),
                total_sixes=Sum('sixes'),
                total_fours=Sum('fours')
            )
            .order_by('-total_runs')[:10]
        )

        # Year-by-year 6s and 4s trend data
        yearly_trends = seasons.values('year', 'total_sixes', 'total_fours', 'total_runs', 'winner_team')

        return Response({
            'total_seasons': seasons.count(),
            'titles_leaderboard': titles_list,
            'all_time_sixes_hitters': all_time_sixes,
            'all_time_fours_hitters': all_time_fours,
            'all_time_run_scorers': all_time_runs,
            'yearly_trends': yearly_trends
        })
