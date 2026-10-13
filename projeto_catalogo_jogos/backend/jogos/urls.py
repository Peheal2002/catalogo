from django.urls import path
from .views import JogoDetailView, JogoListCreateView

urlpatterns = [
    path("jogos/", JogoListCreateView.as_view(), name="jogos"),
    path("jogos/<int:pk>/", JogoDetailView.as_view(), name="jogo-detalhe"),
]
