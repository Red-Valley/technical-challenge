const injectionParts = [
  '<script.?>.?</script>',
  '\\bjavascript\\b|\\bscript\\b|\\.html|\\bfetch\\b|\\blocalstorage\\.setItem\\b|\\bsessionstorage\\.setItem\\b',
  'jquery\\b|\\$\\.(ajax|get|post)\\s*\\(.*\\)',
  'document\\.cookie',
  '\\bxmlhttprequest\\b|\\bgetcurrentposition\\b|\\bsettimeout\\b|\\bsetinterval\\b',
  '\\binnerhtml\\b|\\bouterhtml\\b|\\binsertadjacenthtml\\b|\\biframe\\b|document\\.(write|writeln)',
  'domparser\\.parsefromstring|embed(?=\\s*\\b(src|type)\\b)|object|onclick|addeventlistener',
  'onchange|onblur|onkeypress|onkeydown|onkeyup|navigator|onload|onerror',
  '\\b(SELECT|INSERT INTO|UPDATE|DELETE|WHERE)\\b',
  '\\b(EXEC\\s*\\(|EXECUTE\\s*\\(|CAST\\s*\\(|CONVERT\\s*\\(|DECLARE\\s*\\(|WAITFOR\\s*DELAY)\\b',
  '(?:FROM|SELECT|WHERE)\\s+.\\b(COUNT|SUM|AVG)\\b.(?:FROM|GROUP BY|HAVING)',
  'base64|encodeURIComponent|decodeURIComponent',
  '\\b(ou=|uid=|cn=|dc=)\\b',
  '(?:system\\(|exec\\(|passthru\\(|shell_exec\\(|`)[^)]\\b(cmd|curl|wget|powershell)\\b[^)]\\)',
  '@import|@charset|@media|@font-face',
  '<img\\s+.?src=|<image\\s+.?src=|\\bsrc=\\b',
  '\\btablespace\\b|\\bidentified\\b|\\bdocument\\b|\\bprogram\\b|\\bpowershell\\b',
  'drop\\b\\s+(?:table|database)|grant\\b\\s+.*on',
  'link(?=\\s*=)',
  '\\beval\\b\\s*\\(',
  '\\balert\\b\\s*\\('
].join('|');

const injectionPattern = new RegExp(injectionParts, 'i');

export function injectionValidate () {
  return this.test(`test-injection`, function (value) {
    const { path, createError } = this;

    return (
      !injectionPattern.test(value) ||
      createError({ path, message: 'Content not allowed' })
    );
  });
}