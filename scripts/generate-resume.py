# /// script
# requires-python = ">=3.11"
# dependencies = ["reportlab>=4.0.0"]
# ///

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

# Create the PDF document
doc = SimpleDocTemplate(
    "/vercel/share/v0-project/public/Resume.pdf",
    pagesize=letter,
    rightMargin=0.5*inch,
    leftMargin=0.5*inch,
    topMargin=0.4*inch,
    bottomMargin=0.4*inch
)

# Define styles
styles = getSampleStyleSheet()

# Custom styles for ATS-friendly resume
name_style = ParagraphStyle(
    'Name',
    parent=styles['Heading1'],
    fontSize=18,
    fontName='Helvetica-Bold',
    alignment=TA_CENTER,
    spaceAfter=2,
    textColor=colors.black
)

contact_style = ParagraphStyle(
    'Contact',
    parent=styles['Normal'],
    fontSize=9,
    alignment=TA_CENTER,
    spaceAfter=8,
    textColor=colors.black
)

section_header_style = ParagraphStyle(
    'SectionHeader',
    parent=styles['Heading2'],
    fontSize=11,
    fontName='Helvetica-Bold',
    spaceBefore=8,
    spaceAfter=4,
    textColor=colors.black,
    borderWidth=0,
    borderPadding=0,
    borderColor=colors.black,
)

subsection_style = ParagraphStyle(
    'Subsection',
    parent=styles['Normal'],
    fontSize=10,
    fontName='Helvetica-Bold',
    spaceBefore=4,
    spaceAfter=1,
    textColor=colors.black
)

normal_style = ParagraphStyle(
    'NormalText',
    parent=styles['Normal'],
    fontSize=9,
    fontName='Helvetica',
    spaceAfter=2,
    textColor=colors.black,
    leading=11
)

bullet_style = ParagraphStyle(
    'Bullet',
    parent=styles['Normal'],
    fontSize=9,
    fontName='Helvetica',
    leftIndent=12,
    spaceAfter=2,
    textColor=colors.black,
    leading=11
)

date_style = ParagraphStyle(
    'Date',
    parent=styles['Normal'],
    fontSize=9,
    fontName='Helvetica-Oblique',
    textColor=colors.gray
)

# Build content
content = []

# Header - Name
content.append(Paragraph("VINAYAK GARG", name_style))

# Contact Info - Single line for ATS
contact_info = "Vellore, Tamil Nadu | vngarg0127@gmail.com | 7067053015 | linkedin.com/in/vinayak-garg | github.com/vinayakgarg1"
content.append(Paragraph(contact_info, contact_style))

# Horizontal line
content.append(Spacer(1, 2))

# Education Section
content.append(Paragraph("EDUCATION", section_header_style))
content.append(Spacer(1, 2))

content.append(Paragraph("<b>Vellore Institute of Technology (VIT)</b> | Vellore, Tamil Nadu", normal_style))
content.append(Paragraph("B.Tech in Computer Science and Engineering (IoT Specialization) | CGPA: 9.54/10.0 | Expected May 2028", normal_style))
content.append(Spacer(1, 2))

content.append(Paragraph("<b>DAV School Chhal</b> | Raigarh, Chhattisgarh", normal_style))
content.append(Paragraph("Class XII: 88% (May 2023) | Class X: 94% (May 2021)", normal_style))

# Skills Section
content.append(Paragraph("TECHNICAL SKILLS", section_header_style))
content.append(Spacer(1, 2))

skills_text = """<b>Programming:</b> C++, Python, Java, Data Structures & Algorithms (DSA)<br/>
<b>Web Development:</b> HTML, CSS, JavaScript, React<br/>
<b>Tools & Concepts:</b> Git, Object-Oriented Programming (OOP), Problem Solving"""
content.append(Paragraph(skills_text, normal_style))

# Projects Section
content.append(Paragraph("PROJECTS", section_header_style))
content.append(Spacer(1, 2))

content.append(Paragraph("<b>Real-Time ASL Tracker</b> | Python, Machine Learning, OpenCV", subsection_style))
project1_bullets = [
    "• Developed end-to-end ML application detecting American Sign Language alphabets in real-time using webcam",
    "• Engineered custom data collection pipeline to capture live 3D hand landmarks for model training",
    "• Built classification model from scratch achieving zero-lag predictions for instantaneous translation"
]
for bullet in project1_bullets:
    content.append(Paragraph(bullet, bullet_style))

content.append(Spacer(1, 4))

content.append(Paragraph("<b>Expense Tracker</b> | React, JavaScript, CSS", subsection_style))
project2_bullets = [
    "• Built responsive web application enabling users to log, categorize, and analyze daily expenses",
    "• Implemented state management for real-time expense tracking and data visualization"
]
for bullet in project2_bullets:
    content.append(Paragraph(bullet, bullet_style))

# Experience/Leadership Section
content.append(Paragraph("LEADERSHIP & ACTIVITIES", section_header_style))
content.append(Spacer(1, 2))

content.append(Paragraph("<b>Mozilla Firefox Club</b> | Member | Feb 2026 - Present", subsection_style))
content.append(Paragraph("• Organized SOTY 4.0 event during RIVIERA week, coordinating logistics and participant engagement", bullet_style))

content.append(Spacer(1, 2))

content.append(Paragraph("<b>Code2Innovate Hackathon</b> | Participant | Feb 2026", subsection_style))
content.append(Paragraph("• Collaborated in 48-hour hackathon, rapid-prototyping technical solutions under tight deadlines", bullet_style))

content.append(Spacer(1, 2))

content.append(Paragraph("<b>Gravitas Committee</b> | Volunteer | Sep 2025", subsection_style))
content.append(Paragraph("• Managed multiple events within strict timelines, demonstrating organizational and teamwork skills", bullet_style))

# Achievements Section
content.append(Paragraph("ACHIEVEMENTS", section_header_style))
content.append(Spacer(1, 2))

achievements = [
    "• <b>Branch Topper:</b> Ranked 3rd in CSE (IoT) branch during 2nd year at VIT Vellore",
    "• <b>Branch Topper:</b> Ranked 9th in CSE (IoT) branch during 1st year at VIT Vellore",
    "• <b>JEE Mains:</b> Secured 95.05 percentile among 10+ Lakh candidates"
]
for achievement in achievements:
    content.append(Paragraph(achievement, bullet_style))

# Certifications Section
content.append(Paragraph("CERTIFICATIONS", section_header_style))
content.append(Spacer(1, 2))

certs = [
    "• Mastering C++ with DSA – PW Skills",
    "• Python for Data Analysis and Visualization – VIT Value Added Course"
]
for cert in certs:
    content.append(Paragraph(cert, bullet_style))

# Build PDF
doc.build(content)
print("ATS-friendly one-page resume generated successfully!")
