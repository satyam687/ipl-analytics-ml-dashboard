from django.urls import path
from .views import SeasonListView, SeasonDetailView, MatchPredictorView, IPLAnalyticsOverviewView

urlpatterns = [
    path('seasons/', SeasonListView.as_view(), name='season-list'),
    path('seasons/<int:year>/', SeasonDetailView.as_view(), name='season-detail'),
    path('predict-winner/', MatchPredictorView.as_view(), name='match-predict'),
    path('analytics/', IPLAnalyticsOverviewView.as_view(), name='ipl-analytics'),
]
