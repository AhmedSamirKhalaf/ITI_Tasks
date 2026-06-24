from rag_core import load_and_split_pdf, setup_qdrant_collection
from hybrid_search import hybrid_search_rrf

def main():
    print("Loading the document")
    chunks = load_and_split_pdf("documents/Ahmed_samir_cv.pdf") 
    print(f"got {len(chunks)} chunks")

    
#    print("\n storing in qdrant")
 #   collection = setup_qdrant_collection(chunks)
  #  print(f"stored in collection: '{collection}'")

    
    print("\n searching...")
    results = hybrid_search_rrf("fullstack", limit=3)
    print(results)
if __name__ == "__main__":
    main()