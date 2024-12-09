# scripts/generateAllCountries.py

import os

def generate_all_countries():
    # Define the directory containing individual country files
    script_dir = os.path.dirname(os.path.abspath(__file__))
    countries_dir = os.path.join(script_dir, '../src/data/countries')
    output_file = os.path.join(script_dir, '../src/data/allCountries.ts')

    # Verify that the countries directory exists
    if not os.path.isdir(countries_dir):
        print(f"Error: The directory {countries_dir} does not exist.")
        return

    # List all .ts files in the countries directory
    try:
        files = [f for f in os.listdir(countries_dir) if f.endswith('.ts')]
    except Exception as e:
        print(f"Error reading directory {countries_dir}: {e}")
        return

    if not files:
        print(f"No TypeScript files found in {countries_dir}.")
        return

    # Generate import statements
    imports = []
    for file in files:
        country_code = os.path.splitext(file)[0]  # Removes the .ts extension
        import_statement = f"import {country_code} from './countries/{country_code}';"
        imports.append(import_statement)
    imports_content = '\n'.join(imports)

    # Generate export statement
    country_codes = [os.path.splitext(file)[0] for file in files]
    countries_list = ',\n\t'.join(country_codes)
    exports = f"export const allCountries: Country[] = [\n\t{countries_list}\n];"

    # Combine imports and exports
    content = f"{imports_content}\n\n{exports}\n"

    # Write the combined content to allCountries.ts
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print('allCountries.ts has been generated successfully.')
    except Exception as e:
        print(f"Error writing to {output_file}: {e}")

if __name__ == "__main__":
    generate_all_countries()
