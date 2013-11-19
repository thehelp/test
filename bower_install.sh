set -e

BOWER=bower_components
LIB=lib/vendor/

echo "Blanket (concatenated from node module; browserify for its falafel dependency)"
pushd node_modules/blanket/node_modules/falafel > /dev/null
browserify --entry index.js --standalone falafel --outfile ../../../../lib/vendor/falafel.js
popd > /dev/null
echo "     For now, manually need to remove the UMD stuff from esprima so we don't confuse r.js optimization."

cp node_modules/blanket/src/blanket.js ${LIB}blanket.js
cat node_modules/blanket/src/blanket_browser.js >> ${LIB}blanket.js
cat node_modules/blanket/src/adapters/mocha-blanket.js >> ${LIB}blanket.js
cat node_modules/blanket/src/qunit/reporter.js >> ${LIB}blanket.js
echo "     For now, manually need to remove the if (!blanket.options(\"existingRequireJS\") statement (call oldRun() always)"

# setting this option in the file itself, because it loads at file load time
#  unlike a normal AMD module
echo "blanket.options('existingRequireJS', true);" > ${LIB}blanket-require.js
echo "" >> ${LIB}blanket-require.js
cat node_modules/blanket/src/blanketRequire.js >> ${LIB}blanket-require.js

echo "Chai"
cp ${BOWER}/chai/chai.js ${LIB}

echo "Mocha"
cp ${BOWER}/mocha/mocha.js ${LIB}
cp ${BOWER}/mocha/mocha.css ${LIB}

echo "RequireJS"
cp ${BOWER}/requirejs/require.js ${LIB}

echo "Sinon (building... uses ruby and juicer gem)"
echo "    NOTE: it will update the date every build"
pushd ${BOWER}/sinon/ > /dev/null
./build > /dev/null
popd > /dev/null
cp ${BOWER}/sinon/pkg/sinon.js ${LIB}

echo "success!"
