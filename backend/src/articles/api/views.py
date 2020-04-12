from rest_framework.generics import (
    ListAPIView, 
    RetrieveAPIView, 
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)

from articles.models import Article
from .serializers import ArticleSerializer

# Article List Serializer view. Specify query Specify serializer class
# GenericViews importing ListApiView from rest_framework.generics
class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

# Article Detail Serializer view.
class ArticleDetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

# Article Create Serializer view.
class ArticleCreateView(CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

# Article Update Serializer view.
class ArticleUpdateView(UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

# Article Create Serializer view.
class ArticleDeleteView(DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
