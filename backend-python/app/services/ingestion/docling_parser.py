import re
from docling.document_converter import DocumentConverter

class DoclingParserService:
    def __init__(self):
        self.converter = DocumentConverter()

    def process_file(self, file_url: str):
        print(f"📄 Docling is processing: {file_url}")
        
        # 1. Convert PDF to Markdown
        result = self.converter.convert(file_url)
        markdown_text = result.document.export_to_markdown()
        
        # 2. Extract Structure (Table of Contents)
        structure = self._build_structure(markdown_text)
        
        return {
            "content": markdown_text,
            "structure": structure,
            "page_count": len(result.document.pages) 
        }

    def _build_structure(self, markdown_text: str):
        """
        Parses Markdown headers (#, ##, ###) into a nested JSON tree.
        """
        lines = markdown_text.split('\n')
        root = {"title": "Table of Contents", "children": []}
        stack = [root]  # Stack stores [Root, H1, H2, ...]

        for line in lines:
            match = re.match(r'^(#+)\s+(.*)', line)
            if match:
                level = len(match.group(1)) # # = 1, ## = 2 , ### = 3 etc. indicates level
                title = match.group(2).strip()
                slug = title.lower().replace(" ", "-") # Simple slug generation

                node = {
                    "title": title,
                    "slug": slug,
                    "children": []
                }

                # Adjust stack to find the correct parent
                # If we are at H2, we want to be under H1 (Level 1)
                # Stack[0] is root (Level 0)
                while len(stack) > level:
                    stack.pop()
                
                # Add this node to the parent's children
                parent = stack[-1]
                parent["children"].append(node)
                
                # Push this node onto stack (it might be a parent for the next H3)
                stack.append(node)

        return root["children"]