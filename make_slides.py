import re

with open('d:\\Publisher\\Portofolio\\index..html', 'r', encoding='utf-8') as f:
    content = f.read()

# First, let's extract the projects list.
# We will find the section-title "Selected Projects" and all new-project-section blocks.

# The projects are currently inside:
# <div class="container container-project">
#     <main class="main main-project">
#         <div class="section-title"> ... </div>
#         <div class="new-project-section"> ... </div>
#         ...
#     </main>
# </div>

# We will replace the whole container-project block with individual slides.

# Find the start of container-project
start_marker = '<div class="container container-project">'
end_marker = '<div class="container container-last">'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    projects_block = content[start_idx:end_idx]
    
    # Extract all new-project-section blocks
    project_sections = re.findall(r'<div class="new-project-section">.*?(?=<div class="new-project-section">|</main>)', projects_block, re.DOTALL)
    
    # We also want the section-title to be its own slide or at the top of the first project
    # The user might want the title "Selected Projects" on the first slide.
    
    new_html = ""
    for i, p_html in enumerate(project_sections):
        title_html = ""
        if i == 0:
            title_html = '''<div class="section-title" style="margin-bottom: 20px;">
                                <h2>Selected Projects</h2>
                            </div>'''
        
        slide_html = f'''<div class="project-slide">
        <main class="main">
            {title_html}
            {p_html.strip()}
        </main>
    </div>
    '''
        new_html += slide_html

    # Replace in the original content
    new_content = content[:start_idx] + new_html + content[end_idx:]
    
    with open('d:\\Publisher\\Portofolio\\index..html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced project structure with slides.")
else:
    print("Could not find the markers.")
