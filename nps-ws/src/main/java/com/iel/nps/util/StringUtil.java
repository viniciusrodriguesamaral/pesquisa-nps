package com.iel.nps.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringUtil {
    public static String removerAcentos(String str) {
        //return Normalizer.normalize(str, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
        String nfdNormalizedString = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(nfdNormalizedString).replaceAll("");

    }
}
