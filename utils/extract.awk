#! /usr/bin/env awk -f
#
# Converts lines like this:
#
#   --color-code: var(--color-darkred); /* naked code */
#
# to this:
#
#   --color-code || --color-darkred ||  naked code


function printHead(title) {
  if (!showTables) {
    print "HEAD" title
    return
  }

  printf "<h3>%s</h3>", title
  print "<table>"
  print "  <thead>"
  print "    <tr>"
  print "      <th>Variable"
  print  "      <code style='font-size:var(--font-size-minus-2)'><br>color-background</code><br>"
  print "      </th>"
  print "      <th>Value"
  print  "      <code style='font-size:var(--font-size-minus-2)'><br>color-background-darker<br></code>"
   print "      </th>"
 print "      <th>Notes"
  print  "      <code style='font-size:var(--font-size-minus-2)'><br>color-background-darkest<br></code>"
  print "      </th>"
  print "    </tr>"
  print "  </thead>"
  print "  <tbody>"
}

function printFoot() {
  if (!showTables) {
    print "FOOT"
    return
  }

  print "</tbody>"
  print "</table>"
}



function headFoot(line, title) {
  if (line != 0) {
    printFoot()
  }

  printHead(title)
}

function printEntry() {
  if (!showTables) {
    printf "%-32.32s || %-35.35s || %s\n", $1, $2, $3
    return
  }

  printf "  <tr>\n"
  printf "    <td  class='color-var'>%s</td>\n", $1
  printf "    <td  class='color-val'>%s</td>\n", $2
  printf "    <td  class='color-val'>%s</td>\n", $3
  printf "  </tr>\n"

  if (substr($2, 1, 2) == "--") {
    $2 = "var(" $2 ")"
  }

  print  "  <tr>"
  printf "    <td style='color: %s;background:var(--color-background)'>", $2
  print  "      aptent conubia enim eleifend habitasse id montes"
  print  "    </td>"
  printf "    <td style='color: %s;background:var(--color-background-darker)'>", $2
  print  "      aptent conubia enim eleifend habitasse id montes"
  print  "    </td>"
  printf "    <td style='color: %s;background:var(--color-background-darkest)'>", $2
  print  "      aptent conubia enim eleifend habitasse id montes"
  print  "    </td>"
  print  "  </tr>"
}

####
#
#       B E G I N
#
####

BEGIN {
        line = 0
        showTables = 1
}


/^###\s+(.+)/ {
        $1=""
        headFoot(line++, $0)
}

/\s+--color-/ {
        # fix up 'hsl(x, y, z)' to 'hsl(x,y,z)'
        # so we can keep FS as whitespace
        $0 = gensub(/,\s+/, ",", "g", $0)
        $0 = gensub(/\(\s+/, "(" , "g", $0)

        if ($3) {
          $3 = substr($0, index($0, $3))
        } else {
          $3 = ""
        }

        $1 = gensub(/:/, "", "g", $1)

        $2 = gensub(/;/, "", "g", $2)
        $2 = gensub(/var\(([^\)]+)\)/, "\\1", "g", $2)

        $3 = gensub(/\s+/,  " ",  "g", $3)
        $3 = gensub(/[/*]/, "",   "g", $3)
        $3 = gensub(/;/,    "",   "g", $3)

        printEntry()
}

END {
        if (showTables) {
          print "</table>"
        } else {
          print "FOOT"
        }
}

