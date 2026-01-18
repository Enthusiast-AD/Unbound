from docling.document_converter import DocumentConverter

class DoclingParserService:
    def __init__(self):
        self.converter = DocumentConverter()

    def process_file(self, file_url: str):
        print(f"📄 Docling is processing: {file_url}")
        
        # Docling can convert directly from a URL!
        result = self.converter.convert(file_url)
        
        # Export to Markdown
        markdown_text = result.document.export_to_markdown()
        
        # TODO: Later we will extract the Sidebar Structure here
        
        return markdown_text