set -e

BOWER=bower_components
LIB=lib/vendor/

echo "Sinon (building... uses ruby and juicer gem)"
echo "    NOTE: it will update the date every build"
pushd ${BOWER}/sinon/ > /dev/null
./build > /dev/null
popd > /dev/null
cp ${BOWER}/sinon/pkg/sinon.js ${LIB}

echo "success!"
