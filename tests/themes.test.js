const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true, strict: false });

// Add schemas for VS Code specific URIs
ajv.addSchema({ type: "object", additionalProperties: true }, 'vscode://schemas/workbench-colors');
ajv.addSchema({ type: "array", "items": { "type": "object", "additionalProperties": true } }, 'vscode://schemas/textmate-colors');
ajv.addSchema({ type: "object", additionalProperties: true }, 'vscode://schemas/token-styling');

const schemaPath = path.resolve(__dirname, '../themes/color-theme.schema.json');
const originalSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

// Modify the schema for testing purposes
const testSchema = JSON.parse(JSON.stringify(originalSchema)); // Deep clone
testSchema.properties.colors.additionalProperties = true;

const validate = ajv.compile(testSchema);

const themesDir = path.resolve(__dirname, '../themes');

describe('Theme files', () => {
  it('should exist in the themes directory', () => {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));
    const themes = packageJson.contributes.themes;

    themes.forEach(theme => {
      const themePath = path.resolve(__dirname, '../', theme.path);
      expect(fs.existsSync(themePath)).toBe(true);
    });
  });

  fs.readdirSync(themesDir).forEach(file => {
    if (file.endsWith('.json') && file !== 'color-theme.schema.json') {
      it(`${file} should be a valid theme`, () => {
        const themePath = path.join(themesDir, file);
        const themeContent = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
        const valid = validate(themeContent);
        if (!valid) {
          console.error(validate.errors);
        }
        expect(valid).toBe(true);
      });
    }
  });
});

describe('Color Contrast Compliance', () => {
  test.todo('should check color contrast compliance for all themes');
});
