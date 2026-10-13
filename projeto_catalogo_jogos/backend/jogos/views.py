from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Jogo
from .serializers import JogoSerializer


class JogoListCreateView(APIView):
    def get(self, request):
        nome = request.query_params.get("nome", "").strip()

        jogos = Jogo.objects.all()

        if nome:
            jogos = jogos.filter(titulo__icontains=nome)

        serializer = JogoSerializer(jogos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JogoSerializer(data=request.data)

        if serializer.is_valid():
            jogo = serializer.save()
            return Response(
                JogoSerializer(jogo).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class JogoDetailView(APIView):
    def get_object(self, pk):
        try:
            return Jogo.objects.get(pk=pk)
        except Jogo.DoesNotExist:
            return None

    def get(self, request, pk):
        jogo = self.get_object(pk)

        if jogo is None:
            return Response(
                {"erro": "Jogo não encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(JogoSerializer(jogo).data)

    def delete(self, request, pk):
        jogo = self.get_object(pk)

        if jogo is None:
            return Response(
                {"erro": "Jogo não encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )

        jogo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
