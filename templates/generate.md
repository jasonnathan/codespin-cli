Generate code for the file {{codeFile}} based on the following instructions.

{{codegenPrompt}}

Respond with just the code (for the entire file) in the following format:

$START_FILE_CONTENTS:{{codeFile}}$
import a from "./a";
function somethingSomething() {
//....
}
$END_FILE_CONTENTS:{{codeFile}}$