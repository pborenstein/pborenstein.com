#! /usr/bin/env awk -f



# Converts lines like this:
#
#   --color-code: var(--color-darkred); /* naked code */
#
# to this:
#
#   --color-code || --color-darkred ||  naked code


BEGIN {
  line = 0
}


# /^.*$/ {
#   print $0
# }

/^###\s+.+/ {
  if (line++ != 0) {
    print "</tbody>"
    print "</table>"
  }
  print "\n"
  print
  print "<table>"
  print "  <thead>"
  print "    <tr>"
  print "      <th>Variable</th>"
  print "      <th>Value</th>"
  print "      <th>Notes</th>"
  print "    </tr>"
  print "  </thead>"
  print "  <tbody>"
}

/\s+--color-/ {

  if ($3) {
    $3 = substr($0, index($0, $3))
  } else {
    $3 = ""
  }

  $1 = gensub(/:/, "", "g", $1)
  $2 = gensub(/var\(/, "", "g", $2)
  $2 = gensub(/\)/, "", "g", $2)
  $2 = gensub(/;/, "", "g", $2)
  $3 = gensub(/\s+/, " ", "g", $3)
  $3 = gensub(/[/*]/, "", "g", $3)

#   printf "%-22.22s || %-25.25s || %s\n", $1, $2, $3
  printf "  <tr>\n"
  printf "    <td  class='color-var'>%s</td>\n", $1
  printf "    <td  class='color-val'>%s</td>\n", $2
  printf "    <td  class='color-val'>%s</td>\n", $3
  printf "  </tr>\n"

  if (substr($2, 1, 2) == "--") {
    $2 = "var(" $2 ")"
  }

  print  "  <tr>"
  print  "    <td>&nbsp;</td>"
  printf "    <td colspan=2 style='color: %s'>", $2
  print  "   aptent conubia enim eleifend habitasse id montes"
  print  "    </td>"
  print  "  </tr>"
}

END {
  print "</table>"
  }
