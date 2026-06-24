import asyncio
import os
import streamlit as st

from ingest import ingest
from agent import create_rag_agent, stream_agent_response

st.title("Agentic RAG over MCP (HTTP)")

if "agent" not in st.session_state:
    st.session_state.agent = None
if "ingested_files" not in st.session_state:
    st.session_state.ingested_files = set()

uploaded_file = st.sidebar.file_uploader("Upload a PDF document")

if uploaded_file and uploaded_file.name not in st.session_state.ingested_files:
    os.makedirs("documents", exist_ok=True)
    temp_path = os.path.join("documents", uploaded_file.name)
    with open(temp_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    with st.spinner("Ingesting into Qdrant..."):
        ingest(temp_path)

    st.session_state.ingested_files.add(uploaded_file.name)
    st.success("Document ingested! Make sure mcp_server.py is running.")
elif uploaded_file and uploaded_file.name in st.session_state.ingested_files:
    st.sidebar.info(f"Already ingested: {uploaded_file.name}")

if st.session_state.agent is None:
    with st.spinner("Connecting to MCP server over HTTP..."):
        st.session_state.agent = asyncio.run(create_rag_agent())

user_input = st.chat_input("Ask a question about your documents...")

if user_input:
    st.chat_message("user").write(user_input)

    with st.chat_message("assistant"):
        response_placeholder = st.empty()
        full_response = [""]

        async def run_stream():
            async for token in stream_agent_response(
                st.session_state.agent,
                user_input,
                thread_id="session_001",
            ):
                full_response[0] += token
                response_placeholder.markdown(full_response[0] + "▌")

        asyncio.run(run_stream())
        response_placeholder.markdown(full_response[0])
