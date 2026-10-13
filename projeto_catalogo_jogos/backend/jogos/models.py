from django.db import models

class Jogo(models.Model):
    titulo = models.CharField(max_length=120)
    genero = models.CharField(max_length=60)
    plataforma = models.CharField(max_length=60)
    ano_lancamento = models.PositiveIntegerField()
    disponivel = models.BooleanField(default=True)

    class Meta:
        ordering = ["titulo"]

    def __str__(self):
        return self.titulo
