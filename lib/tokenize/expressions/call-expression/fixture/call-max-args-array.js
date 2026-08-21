createTable(
    users, [
        column(
            id,
            INTEGER,
            primaryKey(),
            identity(),
        ),
        column(
            name,
            TEXT,
        ),
    ],
);