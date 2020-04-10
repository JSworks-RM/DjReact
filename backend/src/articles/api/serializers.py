from rest_framework import serializers

from articles.models import Article

# Serializer class and Model. Specify Meta Model as Article, specify fields
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'content')

# This ArticleSerializer we need to implement it in the views