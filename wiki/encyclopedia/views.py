from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from . import util
from django import forms
from markdown2 import Markdown
import random


class NewEntryForm(forms.Form):
    entry = forms.CharField()

def entry(request, TITLE):
    md = util.get_entry(TITLE)
    markdowner = Markdown()
    if md != None:
        html_content = markdowner.convert(md)
    else:
        html_content = None
    return render(request, "encyclopedia/entry.html", {
        "TITLE": TITLE,
        "entry": html_content
        })

def index(request):
    form = NewEntryForm()
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
        "form": form
    })

def search_view(request):
    if request.method == "GET":
        form = NewEntryForm(request.GET)
        if form.is_valid():
            entries = util.list_entries()
            search_content = form.cleaned_data['entry']
            for entry in entries:
                if entry == search_content:
                    return HttpResponseRedirect(f"/wiki/{search_content}")
            
            suggestions = [entry for entry in entries if search_content in entry.lower()]
            return render(request, "encyclopedia/search_results.html", {
                "suggestions": suggestions,
                "form": form
            })
    
    return HttpResponseRedirect(reverse('index'))

def create_page(request):
    if request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        if title and content:
            entries = util.list_entries()
            for entry in entries:
                if entry == title:
                    error = "An entry with this title already exists."
                    return render(request, "encyclopedia/index.html", {"error": error}) 
            util.save_entry(title, content)
            return HttpResponseRedirect(f"/wiki/{title}")
        else:
            return  render(request, "encyclopedia/new_page.html")
    else:
        return render(request, "encyclopedia/new_page.html")    
    
def fetch_entry(request, TITLE):
    md = util.get_entry(TITLE)
    return render(request, "encyclopedia/edit_page.html", {
        'title': TITLE,
        'content': md
    })

def edit_entry(request):
    if request.method == "POST":
        original_title = request.POST.get("original_title")
        content = request.POST.get("content")
        if original_title and content:
            util.save_entry(original_title, content)
            return HttpResponseRedirect(reverse('entry', kwargs={'TITLE': original_title}))
        else:
            return render(request, "encyclopedia/index.html", {
                "error": "Title and content are required."
            })
    return HttpResponseRedirect(reverse('index'))

def random_page(request):
    entries = util.list_entries()
    ran_num = random.randint(0, len(entries) - 1)
    return HttpResponseRedirect(f"/wiki/{entries[ran_num]}")