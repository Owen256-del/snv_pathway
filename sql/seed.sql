INSERT INTO fields (name, description) VALUES (
    'Biology',  'Biology is the scientific study of life and living organisms, encompassing various sub-disciplines such as genetics, ecology, and physiology. It explores the structure, function, growth, evolution, and distribution of living organisms, providing insights into the natural world and the processes that sustain life.'
),
(
    'Environmental Science', 'Environmental science is an interdisciplinary field that examines the interactions between humans and the environment, focusing on understanding and addressing environmental issues such as pollution, climate change, and resource management. It integrates knowledge from biology, chemistry, geology, and social sciences to promote sustainable practices and protect ecosystems.'
),
(
    'Agronomy', 'Agronomy is the science and practice of crop production and soil management, aiming to optimize agricultural productivity while ensuring environmental sustainability. It involves the study of plant genetics, soil fertility, pest management, and agricultural technologies to enhance food security and support sustainable farming practices.'
),
(
    'Food Science', 'Food science is the study of the physical, biological, and chemical properties of food, as well as the processes involved in its production, preservation, and safety. It encompasses areas such as food chemistry, microbiology, nutrition, and food engineering, with the goal of improving food quality, safety, and sustainability for consumers.'
),
(
    'Biochemistry', 'Biochemistry is the branch of science that explores the chemical processes and substances that occur within living organisms. It focuses on understanding the molecular mechanisms underlying biological functions, including metabolism, enzyme activity, and genetic expression. Biochemistry plays a crucial role in advancing medical research, biotechnology, and our overall understanding of life at the molecular level.'
);

INSERT INTO careers (title, description, field_id) VALUES
('Data Analyst',
 'Analyzes data to support research and decision-making.',
 1),

('Research Scientist',
 'Conducts scientific research and analyzes experimental results.',
 1),

('Environmental Consultant',
 'Provides scientific advice on environmental problems and sustainability.',
 2),

('Agronomist',
 'Applies scientific knowledge to improve agricultural production.',
 3),

('Food Safety Specialist',
 'Ensures food products meet safety and quality standards.',
 4);

 INSERT INTO skills (name, category) VALUES
('Data Analysis', 'Digital'),
('Excel', 'Digital'),
('SQL', 'Digital'),
('Python', 'Programming'),
('Statistics', 'Analytical'),
('Research', 'Scientific'),
('Laboratory Techniques', 'Scientific'),
('GIS', 'Digital'),
('Communication', 'Soft Skill'),
('Problem Solving', 'Soft Skill');

INSERT INTO career_skills (career_id, skill_id, importance) VALUES
-- Data Analyst
(1, 1, 'required'),
(1, 2, 'required'),
(1, 3, 'required'),
(1, 4, 'required'),
(1, 5, 'required'),

-- Research Scientist
(2, 5, 'required'),
(2, 6, 'required'),
(2, 7, 'required'),
(2, 9, 'required'),

-- Environmental Consultant
(3, 6, 'required'),
(3, 8, 'required'),
(3, 9, 'required'),
(3, 10, 'required'),

-- Agronomist
(4, 6, 'required'),
(4, 7, 'required'),
(4, 8, 'required'),

-- Food Safety Specialist
(5, 6, 'required'),
(5, 7, 'required'),
(5, 9, 'required');

INSERT INTO opportunities
(title, organization, description, type, location, country, deadline, url, career_id)
VALUES
(
    'Data Analysis Internship',
    'Tech Solutions Uganda',
    'Internship focused on data analysis and reporting.',
    'Internship',
    'Kampala',
    'Uganda',
    '2026-10-30',
    'https://example.com/data-internship',
    1
),
(
    'Research Assistant Opportunity',
    'University Research Lab',
    'Assist with biological research and laboratory activities.',
    'Research',
    'Algiers',
    'Algeria',
    '2026-11-15',
    'https://example.com/research',
    2
),
(
    'Environmental Project Volunteer',
    'Green Earth Initiative',
    'Volunteer opportunity working on environmental projects.',
    'Volunteering',
    'Algiers',
    'Algeria',
    '2026-12-01',
    'https://example.com/environment',
    3
),
(
    'Junior Data Analyst Course',
    'Digital Skills Academy',
    'Practical training in Excel, SQL and data analysis.',
    'Course',
    'Online',
    'International',
    '2026-12-20',
    'https://example.com/data-course',
    1
);

// ALUMNI

INSERT INTO alumni
(name, field_id, graduation_year, current_role, organization, country, bio, linkedin)
VALUES
('Sarah Nakato', 1, 2023, 'Data Analyst', 'Tech Uganda', 'Uganda',
 'Works in data analysis and business intelligence.',
 'https://linkedin.com'),

('Daniel Okello', 2, 2022, 'Environmental Consultant', 'Green Solutions', 'Uganda',
 'Works on environmental assessment and sustainability projects.',
 'https://linkedin.com'),

('James Ouma', 1, 2021, 'Research Scientist', 'University Research Lab', 'Algeria',
 'Researches biological and laboratory applications.',
 'https://linkedin.com');

/// connect to careers

INSERT INTO alumni_careers (alumni_id, career_id)
VALUES
(1, 1),
(2, 3),
(3, 2);

// mentership request

-- INSERT INTO mentorship_requests
-- (student_id, alumni_id, message)
-- VALUES
-- ($1, $2, $3);