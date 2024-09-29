-- creating a database for a translation agency to manage their freelance translators

create database translation_suppliers;
use translation_suppliers;

-- creating tables and inserting data into them 

create table translators (
translator_ID INTEGER PRIMARY KEY ,
firstName VARCHAR(50) NOT NULL,
surname VARCHAR(50) NOT NULL);

insert into translators
(translator_ID, firstName, surname)
VALUES
('234', 'Javier', 'Sánchez'),
('235', 'Elena', 'Jiménez'),
('236', 'Marisol', 'Cordero'),
('237', 'Chiara', 'Vitale'),
('238', 'Simone', 'De Luca'),
('239', 'Andreas', 'Schreiber'),
('240', 'Sophie', 'Richter'),
('241', 'Carine', 'Dubois'),
('242','Théo', 'Martin'),
('243', 'Miguel', 'Oliveira'),
('244', 'Lotte', 'de Vries'),
('245', 'Yuki', 'Takeda'),
('246', 'Noor', 'Saleh'),
('247', 'Olivia', 'Clarke');

-- select * from translators;

create table contact_details (
ID INTEGER AUTO_INCREMENT PRIMARY KEY,
translator_ID INTEGER,
FOREIGN KEY (translator_ID) REFERENCES translators(translator_ID),
email_address VARCHAR(100) NOT NULL UNIQUE,
phone_number VARCHAR(20)
);

insert into contact_details
(translator_ID, email_address, phone_number)
VALUES
('234', 'javi.sanchez@gmail.com', '+34 612 345 678'),
('235', 'elena.j@gmail.com', '+34 678 901 234'),
('236', 'marisolcordero19@gmail.com', '+34 645 678 912'),
('237', 'chiara_vitale@gmail.com', '+39 335 123 4567'),
('238', 'simonedeluca@gmail.com', '+39 345 987 6543'),
('239', 'a.schreiber@gmail.com', '+49 173 9876543'),
('240', 'sophie-richter@gmail.com', '+49 1521 2345678'),
('241', 'carinedubois29@gmail.com', '+33 6 12 34 56 78'),
('242', 'theomartin@gmail.com', '+33 7 98 76 54 32'),
('243', 'miguel.oli@gmail.com', '+351 93 876 5432'),
('244', 'ldvtranslation@gmail.com', '+31 6 9876 5432'),
('245', 'yuki-takeda@gmail.com', '+81 70-2345-6789'),
('246', 'noor_dsaleh@gmail.com', '+20 12 3456 7890'),
('247', 'oli_clarke@gmail.com', '+44 7 1234 5678');

-- select * from contact_details;


create table source_language (
ID INTEGER AUTO_INCREMENT PRIMARY KEY,
translator_ID INTEGER,
FOREIGN KEY (translator_ID) REFERENCES translators(translator_ID),
source_language VARCHAR(50) NOT NULL);

insert into source_language
(translator_ID, source_language)
VALUES
('234', 'English'),
('235', 'English'),
('236', 'English'),
('237', 'English'),
('238', 'English'),
('239', 'English'),
('240', 'English'),
('241', 'English'),
('242', 'English'),
('243', 'English'),
('244', 'English'),
('245', 'English'),
('246', 'English'),
('247', 'Spanish, French');

-- select * from source_language;

create table target_language (
ID INTEGER AUTO_INCREMENT PRIMARY KEY,
translator_ID INTEGER,
FOREIGN KEY (translator_ID) REFERENCES translators(translator_ID),
target_language VARCHAR(50) NOT NULL);

insert into target_language
(translator_ID, target_language)
VALUES
('234', 'Spanish'),
('235', 'Spanish'),
('236', 'Spanish'),
('237', 'Italian'),
('238', 'Italian'),
('239', 'German'),
('240', 'German'),
('241', 'French'),
('242', 'French'),
('243', 'Portuguese'),
('244', 'Dutch'),
('245', 'Japanese'),
('246', 'Arabic'),
('247', 'English');

-- select * from target_language;

create table specialisms (
specialism_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
specialism VARCHAR(50) NOT NULL UNIQUE);

insert into specialisms
(specialism)
VALUES
('Technical'),
('Medical'),
('Marketing'),
('Legal');

-- select * from specialisms;

create table translator_specialisms (
translator_ID INTEGER REFERENCES translators(translator_ID),
specialism_ID INTEGER REFERENCES specialisms(specialism_ID),
PRIMARY KEY (translator_ID, specialism_ID)
);

insert into translator_specialisms
(translator_ID, specialism_ID)
VALUES
('234', '1'),
('234', '2'),
('235', '3'),
('235', '2'),
('236', '1'),
('237', '2'),
('237', '1'),
('238', '3'),
('238', '4'),
('239', '1'),
('240', '1'),
('240', '2'),
('241', '2'),
('241', '3'),
('242', '1'),
('242', '2'),
('243', '1'),
('244', '2'),
('245', '1'),
('245', '2'),
('246', '2'),
('247', '2'),
('247', '3'),
('247', '4');

-- select * from translator_specialisms;

create table translation_rate (
ID INTEGER AUTO_INCREMENT PRIMARY KEY,
translator_ID INTEGER,
FOREIGN KEY (translator_ID) REFERENCES translators(translator_ID),
rate_per_word DEC(3,2) NOT NULL CHECK (rate_per_word > 0), -- using check constraint to make sure that the translation rate entered is a positive number
currency TEXT(3) NOT NULL
); 

insert into translation_rate
(translator_ID, rate_per_word, currency)
VALUES
('234', '0.07', 'EUR'),
('235', '0.06', 'EUR'),
('236', '0.06', 'EUR'),
('237', '0.07', 'EUR'),
('238', '0.06', 'EUR'),
('239', '0.07', 'EUR'),
('240', '0.08', 'EUR'),
('241', '0.08', 'EUR'),
('242', '0.07', 'EUR'),
('243', '0.06', 'EUR'),
('244', '0.08', 'EUR'),
('245', '0.12', 'USD'),
('246', '0.07', 'USD'),
('247', '0.07', 'GBP');

-- select * from translation_rate;

create table assessment (
assessment_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
translator_ID INTEGER,
FOREIGN KEY (translator_ID) REFERENCES translators(translator_ID),
assessment_due_date DATE NOT NULL); 

insert into assessment
(translator_ID, assessment_due_date)
VALUES
('234', '2023-09-15'),
('235', '2025-12-22'),
('236', '2024-06-04'),
('237', '2023-11-29'),
('238', '2025-01-10'),
('239', '2024-08-17'),
('240', '2025-03-03'),
('241', '2024-10-28'),
('242', '2025-07-19'),
('243', '2024-02-07'),
('244', '2026-04-25'),
('245', '2025-09-11'),
('246', '2023-05-02'),
('247', '2026-03-12');

-- select * from assessment;

 -- creating a trigger so that if you add a new translator to the assessment table and don't specify an assessment due date, it automatically sets it for 1 year after the current date 
DELIMITER //
create trigger set_assessment_due_date
before insert on assessment
for each row
begin
	set NEW.assessment_due_date = current_date + interval 1 year;
end;
//
DELIMITER ;

-- inserting a new translator into the database and using a select statement to test the trigger works correctly
insert into translators
(translator_ID, firstName, surname)
VALUES
('248', 'Amelia', 'Brown');

insert into assessment
(assessment_ID, translator_ID)
VALUES
('15', '248');

select * from assessment
where translator_ID = '248';

-- creating a stored procedure and using the if function to show the assessment status for all translators
DELIMITER //
CREATE PROCEDURE Get_Assessment_Status()
BEGIN
SELECT t.firstName, t.surname,
IF (assessment_due_date < NOW(), 'YES', 'NO') as Assessment_Due
FROM translators t
JOIN assessment a ON t.translator_ID = a.translator_ID
ORDER BY firstName;
END
//
DELIMITER ;

CALL Get_Assessment_Status();

-- creating a stored procedure to find which translators are currently due for an assessment
DELIMITER //
CREATE PROCEDURE Get_Translators_Due_Assessment()
BEGIN
SELECT a.translator_ID, a.assessment_due_date, t.firstName, t.surname
FROM assessment a
JOIN translators t
ON a.translator_ID = t.translator_ID
WHERE assessment_due_date < NOW()
ORDER BY firstName, surname; 
END 
 //
 DELIMITER ;
 
 CALL Get_Translators_Due_Assessment();

-- using the count function to see how many translators there are for each target language
SELECT target_language, COUNT(target_language) AS count
FROM target_language
GROUP BY target_language;

-- I am looking for a supplier to translate a medical brochure from English into Spanish. Here I am retrieving a list of all the English>Spanish medical translators who are not currently due an assessment (i.e. they are suitable for this job)
SELECT ts.translator_ID, tl.target_language, sl.source_language, t.firstName, t.surname, cd.email_address, s.specialism, a.assessment_due_date
FROM translator_specialisms ts
JOIN specialisms s ON ts.specialism_ID = s.specialism_ID
JOIN target_language tl ON ts.translator_ID = tl.translator_ID
JOIN source_language sl ON ts.translator_ID = sl.translator_ID
JOIN translators t ON ts.translator_ID = t.translator_ID
JOIN contact_details cd ON ts.translator_ID = cd.translator_ID
JOIN assessment a ON ts.translator_ID = a.translator_ID
WHERE specialism = 'Medical' AND target_language = 'Spanish' AND assessment_due_date > NOW()
ORDER BY firstName;


-- using the average function to find out the average rate per word for English>Spanish translation
SELECT tl.target_language, tr.currency, AVG(rate_per_word) AS average_rate_per_word
FROM translation_rate tr
JOIN target_language tl ON tr.translator_ID = tl.translator_ID
WHERE tl.target_language = 'Spanish'
GROUP BY currency;

-- Carine Dubois no longer translates medical content, so I am checking which specialisms we currently have listed for her and then deleting 'Medical' from the list. I can then run the same select statement again to check this has worked correctly.
SELECT * FROM translator_specialisms ts
JOIN translators t ON ts.translator_ID = t.translator_ID
JOIN specialisms s ON ts.specialism_ID = s.specialism_ID
WHERE firstName = 'Carine' AND surname = 'Dubois';

DELETE FROM translator_specialisms
WHERE translator_ID = '241' AND specialism_ID = '2';

-- using a left join to show all translators and their corresponding specialisms
SELECT ts.translator_ID, t.firstName, s.specialism
FROM translator_specialisms ts
LEFT JOIN specialisms s  ON ts.specialism_ID = s.specialism_ID
LEFT JOIN translators t ON ts.translator_ID = t.translator_ID
ORDER BY specialism;

