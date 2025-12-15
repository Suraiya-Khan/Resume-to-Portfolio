import streamlit as st
import zipfile
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

# Load environment variables
load_dotenv()
os.environ['GOOGLE_API_KEY'] = os.getenv('gemini')

st.set_page_config(page_title="AI Portfolio")
st.title("Resume to Portfolio website")

# Upload resume
uploaded_file = st.file_uploader("Upload your resume (PDF or TXT)", type=["pdf", "txt"])

resume_text = ""
if uploaded_file is not None:
    if uploaded_file.type == "application/pdf":
        # Simple PDF text extraction
        import PyPDF2
        
        reader = PyPDF2.PdfReader(uploaded_file)
        resume_text = " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
    else:
        resume_text = uploaded_file.read().decode("utf-8")


    if st.button("Generate your portfolio website"):
        system_prompt = """
        You are an expert AI assistant specialized in frontend web development and automation.Your task is to transform any uploaded resume into a 
        complete, professional mobile friendly,fast loading,visually appealing,high quality design,asthetics portfolio website by using best colourful,attractive template. 
        It also has ai chatbot for any query.Also add section for About/Introduction, Skills,Projects, Education,Contact details

Follow these rules:

1. Parse the resume text and extract structured information:
   - About/Introduction
   - Skills
   - Projects
   - Education
   - Contact details

2. Generate clean, responsive, and professional frontend code:
   - HTML for structure
   - CSS for styling and layout
   - JavaScript for interactivity

3. Ensure the output strictly follows this format:
   --html--
   [HTML code]
   --html--

   --css--
   [CSS code]
   --css--

   --js--
   [JavaScript code]
   --js--

4. The design should be modern, mobile‑friendly, and visually appealing. 
5. Keep the code modular and easy to customize.
        """

        messages = [
            ("system", system_prompt),
            ("user", resume_text)
        ]

        model = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")
        response = model.invoke(messages)
        content = response.content

        try:
            html_code = content.split("--html--")[1].strip()
            css_code = content.split("--css--")[1].strip()
            js_code = content.split("--js--")[1].strip()
        except Exception as e:
            st.error("Parsing error: " + str(e))
            st.stop()

        with open("index.html", "w", encoding="utf-8") as f:
            f.write(html_code)
        with open("style.css", "w", encoding="utf-8") as f:
            f.write(css_code)
        with open("script.js", "w", encoding="utf-8") as f:
            f.write(js_code)

        with zipfile.ZipFile("website.zip", "w") as zipf:
            zipf.write("index.html", arcname="index.html")
            zipf.write("style.css", arcname="style.css")
            zipf.write("script.js", arcname="script.js")

        with open("website.zip", "rb") as f:
            st.download_button("Download Portfolio Website",
                               data=f.read(),
                               file_name="website.zip")

        st.success("Website generated successfully!")