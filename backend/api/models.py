from django.db import models

class Season(models.Model):
    year = models.IntegerField(unique=True)
    winner_team = models.CharField(max_length=100)
    winner_code = models.CharField(max_length=10)
    runner_up = models.CharField(max_length=100)
    final_venue = models.CharField(max_length=150)
    final_margin = models.CharField(max_length=100)
    player_of_season = models.CharField(max_length=100)
    
    orange_cap_player = models.CharField(max_length=100)
    orange_cap_runs = models.IntegerField(default=0)
    orange_cap_team = models.CharField(max_length=50, default='')
    
    purple_cap_player = models.CharField(max_length=100)
    purple_cap_wickets = models.IntegerField(default=0)
    purple_cap_team = models.CharField(max_length=50, default='')
    
    total_sixes = models.IntegerField(default=0)
    total_fours = models.IntegerField(default=0)
    total_runs = models.IntegerField(default=0)
    total_matches = models.IntegerField(default=0)
    
    congratulation_message = models.TextField()
    theme_color = models.CharField(max_length=20, default="#F59E0B")

    class Meta:
        app_label = 'api'
    
    def __str__(self):
        return f"IPL {self.year} - Champion: {self.winner_team}"

class PlayerSeasonStat(models.Model):
    season = models.ForeignKey(Season, related_name='player_stats', on_delete=models.CASCADE)
    player_name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    role = models.CharField(max_length=50, default="Batsman")
    matches = models.IntegerField(default=0)
    runs = models.IntegerField(default=0)
    balls_faced = models.IntegerField(default=0)
    strike_rate = models.FloatField(default=0.0)
    fours = models.IntegerField(default=0)
    sixes = models.IntegerField(default=0)
    wickets = models.IntegerField(default=0)
    economy = models.FloatField(default=0.0)
    highest_score = models.CharField(max_length=20, default="0")
    
    class Meta:
        app_label = 'api'
        ordering = ['-runs', '-sixes']

    def __str__(self):
        return f"{self.player_name} ({self.season.year}) - {self.runs} runs, {self.sixes} 6s"

class Match(models.Model):
    season = models.ForeignKey(Season, related_name='matches', on_delete=models.CASCADE)
    match_number = models.IntegerField()
    match_stage = models.CharField(max_length=50, default="League")
    team1 = models.CharField(max_length=100)
    team2 = models.CharField(max_length=100)
    winner = models.CharField(max_length=100)
    win_margin = models.CharField(max_length=100, default="")
    toss_winner = models.CharField(max_length=100)
    toss_decision = models.CharField(max_length=20)
    venue = models.CharField(max_length=150)
    player_of_match = models.CharField(max_length=100)
    team1_runs = models.IntegerField(default=0)
    team1_wickets = models.IntegerField(default=0)
    team2_runs = models.IntegerField(default=0)
    team2_wickets = models.IntegerField(default=0)

    class Meta:
        app_label = 'api'
    
    def __str__(self):
        return f"IPL {self.season.year} M{self.match_number}: {self.team1} vs {self.team2}"
