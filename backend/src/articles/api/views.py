from rest_framework import viewsets

from articles.models import Article
from .serializers import ArticleSerializer

# ViewSets
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    
