from flask import Flask, request, jsonify
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

llm = AzureChatOpenAI(
    api_key=os.getenv("AZURE_KEY"),
    api_version=os.getenv("AZURE_API_VERSION"),
    temperature=0,
    max_tokens=None,
    azure_endpoint=os.getenv("AZURE_ENDPOINT"),
    azure_deployment=os.getenv("AZURE_DEPLOYMENT"),
)

@app.route('/recommend', methods=['GET'])
def recommend():
    movie = request.args.get('movie', '')

    prompt_template = ChatPromptTemplate.from_template("""
            You are an expert in recommending movies.

            Based on the movie {movie}, recommend five movies that are similar in terms of genre, plot, theme, or tone. 
            Provide a one to two lines description for each recommended movie, including why it's a good match for someone who enjoyed {movie}.
            Format each recommendation like this:
            1. Title (Year) - Description
            Please provide only the movie title, year, and description, formatted as above.
        """)

    response = llm.invoke(prompt_template.format(movie=movie))
    response_content = response.content.strip()

    recommendations = []

    recs = response_content.split("\n")
    
    for rec in recs:
        if rec.strip():
            parts = rec.split(" - ", 1)
            if len(parts) == 2:
                title_year = parts[0].strip()
                description = parts[1].strip()
                
                title_year_parts = title_year.rsplit(" (", 1)
                if len(title_year_parts) == 2:
                    title = title_year_parts[0].strip()
                    year = title_year_parts[1].replace(")", "").strip()

                    recommendations.append({
                        "title": title,
                        "year": year,
                        "description": description
                    })

    return jsonify({"movie": movie, "recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True)
