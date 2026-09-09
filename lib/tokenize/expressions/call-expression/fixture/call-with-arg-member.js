await expect(
    page
        .getByTestId('editor-source')
        .getByRole('textbox'),
).toBeVisible();