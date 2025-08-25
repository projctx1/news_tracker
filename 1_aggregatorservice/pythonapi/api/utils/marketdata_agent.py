import os

from langchain.chat_models import init_chat_model
from langchain_openai import OpenAIEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore

import bs4
import requests
from bs4 import BeautifulSoup
from langchain import hub
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import START, StateGraph
from typing_extensions import List, TypedDict

import requests
import boto3

#this agent looks out for market data
#this is the agent that will feed out database with market info for the other agents to use

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")

vector_store = InMemoryVectorStore(embeddings)

llm = init_chat_model("gpt-4o-mini", model_provider="openai")

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, add_start_index=True,)

prompt = hub.pull("rlm/rag-prompt")

bucket_name = "scrapperservicedata"
object_key = "scrappedhtml/68a74b0725ceda8300c66e04.html"

class State(TypedDict):
    question: str
    context: List[Document]
    answer: str

def strip_all_tags(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    for tag in soup(["script", "style"]):
        tag.decompose()
    return soup.get_text()


def get_s3_file_content(bucket_name, object_key):
    s3_client = boto3.client('s3')

    try:
        response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        
        file_content = response['Body'].read().decode('utf-8')
        
        return file_content

    except Exception as e:
        print(f"Error getting object {object_key} from bucket {bucket_name}: {e}")
        return None
    
def retrieve_context(content, metadata):
    if content:
        unsplit_doc = Document(page_content=strip_all_tags(content), metadata={"source": metadata})
        split_doc = text_splitter.split_documents([unsplit_doc]) 
        
        return split_doc
    else: 
        print("Failed to retrieve content.")
        return None
    
def generate_headlines(state):
    content = get_s3_file_content(bucket_name, object_key)

    context_data = retrieve_context(content, object_key)
    
    docs_content = "\n\n".join(doc.page_content for doc in context_data)
    messages = prompt.invoke({"question": state["question"], "context": docs_content})
    response = llm.invoke(messages)
    return {"answer": response.content}



def marketdata_agent():
    content = get_s3_file_content(bucket_name, object_key)
    
    print(type(content))
    
    '''graph_builder = StateGraph(State).add_sequence([generate_headlines])
    graph_builder.add_edge(START, "generate_headlines")
    graph = graph_builder.compile()
    
    result = graph.invoke({"question": "Create as many headlines as you can from this context"})   
     
    print('=================')
    
    print(result);'''