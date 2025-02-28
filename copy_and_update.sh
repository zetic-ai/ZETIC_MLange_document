
rm -rf ./docs

cp -r ../zetic_api_doc/doc/build/html ./
mv html docs

cp ./.nojekyll ./docs/
