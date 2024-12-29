from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('wiki/<str:TITLE>', views.entry, name="entry"),
    path("wiki/", views.search_view, name="search"),
    path("new_page/", views.create_page, name="newpage"),
    path("edit_page/<str:TITLE>", views.fetch_entry, name="fetchentry"),
    path("edit/", views.edit_entry, name="editpage"),
    path("random/", views.random_page, name="randompage")
]
