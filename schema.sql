    CREATE TYPE status AS ENUM (
        'egg',
        'born',
        'death'
    );

    CREATE TYPE species AS ENUM (
        'dog',
        'cat',
        'dinosaur'
    );

    CREATE TABLE users (
        id              serial PRIMARY KEY NOT NULL,
        name            name NOT NULL,
        createDay       bigint NOT NULL DEFAULT (extract(epoch from now())),
        todaysScore     integer NOT NULL DEFAULT 0,
        weeklyScore     integer NOT NULL DEFAULT 0,
        monthlyScore    integer NOT NULL DEFAULT 0,
        canNewAnimal    integer NOT NULL DEFAULT 1
    );

    ALTER TABLE users
    ADD COLUMN dailyNote integer not null DEFAULT 0;

    CREATE TABLE animals(
        species         species NOT NULL,
        breedingDays    integer NOT NULL,

        PRIMARY KEY (species)
    );

    CREATE TABLE posts(
        id              serial PRIMARY KEY NOT NULL,
        userId          integer NOT NULL,
        score           integer NOT NULL,
        text            text NOT NULL,
        createDay       bigint NOT NULL DEFAULT (extract(epoch from now())),

        FOREIGN KEY (userId) references users
 
    );

    CREATE TABLE userAnimal(
        id              serial PRIMARY KEY NOT NULL,
        userId          integer NOT NULL,
        animalId        species NOT NULL,
        animalStatus    status NOT NULL,
        feedingDays     integer NOT NULL DEFAULT 0,
        timeBirth       bigint NOT NULL DEFAULT (extract(epoch from now())),
        timeEnd         bigint,

        FOREIGN KEY (userId) references users,
        FOREIGN key (animalId) references animals
    );


    CREATE INDEX posts_idx_ts ON posts USING btree(createDay);
    CREATE INDEX posts_idx_text ON posts USING gin(text gin_trgm_ops);


    --====== populate data======--

    --- users ---

    INSERT INTO users(name, todaysScore, weeklyScore, monthlyScore)
    SELECT
        'kevin' || i,
        floor(random()*10 + 1)::int,
        floor(random()*10 + 1)::int,
        floor(random()*10 + 1)::int

    FROM generate_series(1, 100) AS s(i);

    --- animal ---

    INSERT INTO animals(species, breedingDays)
    VALUES('dog', 7);
    INSERT INTO animals(species, breedingDays)
    VALUES('cat', 15);
    INSERT INTO animals(species, breedingDays)
    VALUES('dinosaur', 28);

    --- posts ---

    INSERT INTO posts(text, userId, score)
    SELECT
        'hope debug successfully' || i,
        floor(random()*100 + 1)::int,
        floor(random()*10 + 1)::int

    FROM generate_series(1, 300) AS s(i);

    --- userAnimal ---

    INSERT INTO userAnimal(userId, animalId, animalStatus, feedingDays)
    SELECT
        floor(random()*100 + 1)::int,
        'dog',
        'egg',
        floor(random()*8)::int

    FROM generate_series(1, 100) AS s(i);

    Update userAnimal
    SET animalStatus = 'born'
    WHERE feedingDays = 7 AND animalId = 'dog';

    INSERT INTO userAnimal(userId, animalId, animalStatus, feedingDays)
    SELECT
        floor(random()*100 + 1)::int,
        'cat',
        'egg',
        floor(random()*16)::int

    FROM generate_series(1, 100) AS s(i);

    Update userAnimal
    SET animalStatus = 'born'
    WHERE feedingDays = 15 AND animalId = 'cat';

    INSERT INTO userAnimal(userId, animalId, animalStatus, feedingDays)
    SELECT
        floor(random()*100 + 1)::int,
        'dinosaur',
        'egg',
        floor(random()*29)::int

    FROM generate_series(1, 100) AS s(i);

    Update userAnimal
    SET animalStatus = 'born'
    WHERE feedingDays = 28 AND animalId = 'dinosaur';

    SELECT * FROM userAnimal
    JOIN users ON userId = users.id
    WHERE userId < 20;

    BEGIN TRANSACTION;
    Update userAnimal 
    SET animalStatus = 'death'
    FROM users
    WHERE userAnimal.userid = users.id 
    AND users.dailyNote = 0
    AND animalStatus = 'egg';

    Update users 
    SET canNewAnimal = 0;
    COMMIT;

    SELECT * from userAnimal
    order by userid;

    Update users
    SET dailyNote = 3
    WHERE id < 10;


select * from useranimal order by userid;


        BEGIN TRANSACTION;
        
        Update users
        SET dailyNote = dailyNote + 1
        WHERE id = 10;

        Update userAnimal
        SET animalStatus = 'born'
        FROM animals, users 
        WHERE users.dailyNote = 3
        AND useranimal.userid = 1
        AND animalStatus = 'egg'
        AND userAnimal.feedingDays = animals.breedingDays - 1
        AND userAnimal.animalId = animals.species;

        COMMIT;

        Update userAnimal
        SET feedingDays = 14, animalStatus = 'egg'
        WHERE userId = 1 
        AND animalid = 'cat';



        Update users
        SET dailyNote = dailyNote + 1
        WHERE id = 1;

        Update userAnimal
        SET animalStatus = 'born'
        FROM animals, users 
        WHERE users.dailyNote = 3
        AND useranimal.userid = 1
        AND animalStatus = 'egg'
        AND userAnimal.feedingDays = animals.breedingDays - 1
        AND userAnimal.animalId = animals.species;



    




