set -e

BOWER=bower_components
LIB=lib/vendor/

echo "Blanket (concatenated from node module; browserify for its falafel dependency)"
pushd node_modules/blanket/node_modules/falafel > /dev/null
browserify --entry index.js --standalone index.js --outfile ../../../../lib/vendor/falafel.js
popd > /dev/null
cp node_modules/blanket/src/blanket.js ${LIB}blanket.js
cat node_modules/blanket/src/blanket_browser.js >> ${LIB}blanket.js
cat node_modules/blanket/src/adapters/mocha-blanket.js >> ${LIB}blanket.js
cat node_modules/blanket/src/qunit/reporter.js >> ${LIB}blanket.js
cp node_modules/blanket/src/blanketRequire.js ${LIB}blanket-require.js

echo "Chai"
cp ${BOWER}/chai/chai.js ${LIB}

echo "JQuery"
cp ${BOWER}/jquery/jquery.js ${LIB}
cp ${BOWER}/jquery/jquery.min.js ${LIB}

echo "Mocha"
cp ${BOWER}/mocha/mocha.js ${LIB}
cp ${BOWER}/mocha/mocha.css ${LIB}

echo "RequireJS (building... uses java)"
pushd ${BOWER}/requirejs/dist > /dev/null
rm -rf build
mkdir build
java -jar ../../r.js/lib/closure/compiler.jar --js ../require.js --js_output_file build/require.min.js
popd > /dev/null
cp ${BOWER}/requirejs/require.js ${LIB}
cp ${BOWER}/requirejs/dist/build/require.min.js ${LIB}

echo "Sinon (building... uses ruby and juicer gem)"
echo "    NOTE: it will update the date every build"
pushd ${BOWER}/sinon/ > /dev/null
./build > /dev/null
popd > /dev/null
cp ${BOWER}/sinon/pkg/sinon.js ${LIB}

echo "success!"
