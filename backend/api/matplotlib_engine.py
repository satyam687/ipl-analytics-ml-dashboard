import matplotlib
matplotlib.use('Agg') # Non-gui backend for Django server
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import io
import base64

def generate_season_matplotlib_charts(season_obj, player_stats, matches):
    """
    Generates Matplotlib graphs for a given IPL season:
    1. Runs progression & match totals graph
    2. Sixes & Fours Leaderboard chart
    3. Orange Cap (High Run Scorers) bar chart
    4. Winner match outcome breakdown pie/bar chart
    Returns a dictionary of Base64 encoded PNG images.
    """
    charts = {}

    # Set aesthetic style
    plt.style.use('dark_background')
    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial']

    # 1. RUNS PROGRESSION GRAPH (Run Graph)
    if matches:
        fig, ax = plt.subplots(figsize=(9, 4.5), dpi=120)
        match_nums = [f"M{m.match_number}" for m in matches]
        t1_runs = [m.team1_runs for m in matches]
        t2_runs = [m.team2_runs for m in matches]
        match_totals = [m.team1_runs + m.team2_runs for m in matches]
        
        x = np.arange(len(match_nums))
        
        ax.plot(x, t1_runs, marker='o', color='#3B82F6', linewidth=2, label='Team 1 Score')
        ax.plot(x, t2_runs, marker='s', color='#EF4444', linewidth=2, label='Team 2 Score')
        ax.plot(x, match_totals, marker='^', color='#F59E0B', linewidth=2.5, linestyle='--', label='Match Total Runs')
        
        ax.set_title(f'IPL {season_obj.year} Match-by-Match Run Progression Graph', fontsize=14, fontweight='bold', color='#F3F4F6', pad=15)
        ax.set_xlabel('Matches', fontsize=11, color='#9CA3AF')
        ax.set_ylabel('Runs Scored', fontsize=11, color='#9CA3AF')
        ax.set_xticks(x)
        ax.set_xticklabels(match_nums, rotation=45, fontsize=9)
        ax.grid(True, linestyle=':', alpha=0.3, color='#4B5563')
        ax.legend(facecolor='#1F2937', edgecolor='#374151', loc='upper left')
        plt.tight_layout()

        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight', facecolor='#111827')
        buf.seek(0)
        charts['runs_progression_graph'] = base64.b64encode(buf.getvalue()).decode('utf-8')
        plt.close(fig)

    # 2. SIXES & FOURS LEADERBOARD GRAPH
    if player_stats:
        # Sort by total boundaries
        df_players = pd.DataFrame(list(player_stats.values('player_name', 'team', 'fours', 'sixes', 'runs')))
        if not df_players.empty:
            df_players['boundaries'] = df_players['fours'] + df_players['sixes']
            df_top_boundaries = df_players.sort_values(by='sixes', ascending=False).head(8)

            fig, ax = plt.subplots(figsize=(9, 4.5), dpi=120)
            players = df_top_boundaries['player_name'].tolist()
            sixes = df_top_boundaries['sixes'].tolist()
            fours = df_top_boundaries['fours'].tolist()
            
            y_pos = np.arange(len(players))
            height = 0.35

            ax.barh(y_pos - height/2, sixes, height, label='6s (Sixes)', color='#8B5CF6')
            ax.barh(y_pos + height/2, fours, height, label='4s (Fours)', color='#10B981')

            ax.set_yticks(y_pos)
            ax.set_yticklabels(players, fontsize=10, fontweight='bold', color='#E5E7EB')
            ax.invert_yaxis()
            ax.set_xlabel('Count', fontsize=11, color='#9CA3AF')
            ax.set_title(f'IPL {season_obj.year} Top Boundary Hitters (Sixes & Fours)', fontsize=14, fontweight='bold', color='#F3F4F6', pad=15)
            ax.grid(True, linestyle=':', alpha=0.3, color='#4B5563')
            ax.legend(facecolor='#1F2937', edgecolor='#374151')
            plt.tight_layout()

            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight', facecolor='#111827')
            buf.seek(0)
            charts['sixes_fours_graph'] = base64.b64encode(buf.getvalue()).decode('utf-8')
            plt.close(fig)

            # 3. HIGH RUN SCORERS (ORANGE CAP CONTENDERS BAR CHART)
            df_top_runs = df_players.sort_values(by='runs', ascending=False).head(8)
            fig, ax = plt.subplots(figsize=(9, 4.5), dpi=120)
            
            p_names = df_top_runs['player_name'].tolist()
            p_runs = df_top_runs['runs'].tolist()
            
            colors = ['#F59E0B' if i==0 else '#3B82F6' for i in range(len(p_names))]
            bars = ax.bar(p_names, p_runs, color=colors, edgecolor='#1F2937', width=0.6)
            
            for bar in bars:
                height = bar.get_height()
                ax.annotate(f'{height}',
                            xy=(bar.get_x() + bar.get_width() / 2, height),
                            xytext=(0, 3),  # 3 points vertical offset
                            textcoords="offset points",
                            ha='center', va='bottom', fontsize=9, fontweight='bold', color='#FCD34D')

            ax.set_title(f'IPL {season_obj.year} Orange Cap Leaderboard (Highest Run Scorers)', fontsize=14, fontweight='bold', color='#F3F4F6', pad=15)
            ax.set_ylabel('Total Runs', fontsize=11, color='#9CA3AF')
            ax.set_xticklabels(p_names, rotation=30, ha='right', fontsize=9.5, fontweight='bold')
            ax.grid(True, linestyle=':', alpha=0.3, color='#4B5563')
            plt.tight_layout()

            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight', facecolor='#111827')
            buf.seek(0)
            charts['high_runs_graph'] = base64.b64encode(buf.getvalue()).decode('utf-8')
            plt.close(fig)

    return charts
