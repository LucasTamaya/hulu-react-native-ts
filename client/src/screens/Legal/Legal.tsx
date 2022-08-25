import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Dashboard/Header";

interface Props {}

export const Legal: React.FC<Props> = ({}) => {
  return (
    <SafeAreaView className="bg-[#151516] h-full" testID="legal">
      <ScrollView>
        <Header />
        <View className="px-7">
          <Text className="text-white text-2xl font-bold mt-10">
            Mentions légales
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Présentation du site
          </Text>
          <Text className="text-white mb-3">
            En vertu de l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour
            la confiance dans l’économie numérique, les différents intervenants
            du site dans le cadre de sa réalisation et de son suivi :
          </Text>

          <Text className="text-white mb-3">
            &omicron; Propriétaire : - , auteur au capital de 0€. Le
            propriétaire du site internet est joignable à cette adresse :
            lucastamaya.974@gmail.com
          </Text>
          <Text className="text-white mb-3">
            &omicron; Adresse : 16 ruelle Acoly, 97400, Saint Denis
          </Text>
          <Text className="text-white mb-3">
            &omicron; Créateur du site : TAMAYA Lucas
          </Text>
          <Text className="text-white mb-3">
            &omicron; Responsable publication : Lucas TAMAYA
            -lucastamaya.974@gmail.com
          </Text>
          <Text className="text-white mb-3">&omicron; Hébergeur : ...</Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Conditions d'utilisations
          </Text>
          <Text className="text-white mb-3">
            L’utilisation du site implique l’acceptation pleine et entière des
            conditions générales d’utilisation ci-après décrites. Ces conditions
            d’utilisation sont susceptibles d’être modifiées ou complétées à
            tout moment, les utilisateurs du site sont donc invités à les
            consulter de manière régulière.
          </Text>

          <Text className="text-white mb-3">
            Le site est mis à jour régulièrement par Lucas TAMAYA. De la même
            façon, les mentions légales peuvent être modifiées à tout moment :
            elles s’imposent néanmoins à l’utilisateur qui est invité à s’y
            référer le plus souvent possible afin d’en prendre connaissance.
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Services fournis
          </Text>
          <Text className="text-white mb-3">
            Lucas TAMAYA, s’efforce de fournir sur le site des informations
            aussi précises que possible.
          </Text>
          <Text className="text-white mb-3">
            Toutefois, il ne pourra être tenue responsable des omissions, des
            inexactitudes et des carences dans la mise à jour, qu’elles soient
            de son fait ou du fait des tiers partenaires qui lui fournissent ces
            informations.
          </Text>
          <Text className="text-white mb-3">
            Tous les informations indiquées sur le site
            https://portfolio3-0-lucastamaya.vercel.app/ sont données à titre
            indicatif, et sont susceptibles d’évoluer. Aussi, toutes les
            informations indiquées sur le site Site
            https://portfolio3-0-lucastamaya.vercel.app/ sont données à titre
            indicatif, et sont susceptibles de changer ou d’évoluer sans
            préavis.
          </Text>

          <Text className="text-white mb-3">
            Si vous constatez une lacune, erreur ou ce qui parait être un
            dysfonctionnement, merci de bien vouloir le signaler par email, à
            l’adresse lucastamaya.974@gmail.com, en décrivant le problème de la
            manière la plus précise possible (vous vous trouver sur un
            téléphone, une tablette ou bien un ordinateur ; nom de la page qui
            pose problème, type de système d’exploitation, navigateur
            utilisé,…).
          </Text>
          <Text className="text-white mb-3">
            Lucas TAMAYA n’est en aucun cas responsable de l’utilisation faite
            de ces informations, et de tout préjudice direct ou indirect pouvant
            en découler.
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Propriété intellectuelle et contrefaçons
          </Text>

          <Text className="text-white mb-3">
            «Responsable de la publication - Prénom» «Responsable de la
            publication - Nom de famille» est propriétaire des droits de
            propriété intellectuelle ou détient les droits d’usage sur tous les
            éléments accessibles sur le site, notamment les textes, images,
            graphismes, logo, icônes, sons, logiciels
          </Text>

          <Text className="text-white mb-3">
            Toute reproduction, représentation, modification, publication,
            distribution, retransmission, adaptation de tout ou partie des
            éléments du site, quel que soit le moyen ou le procédé utilisé, est
            interdite, sauf autorisation écrite préalable de :
            https://portfolio3-0- lucastamaya.vercel.app/.
          </Text>

          <Text className="text-white mb-3">
            Toute exploitation non autorisée du site ou de l’un quelconque des
            éléments qu’il contient, par quelque procédé que ce soit, sera
            considérée comme constitutive d’une contrefaçon et poursuivie
            conformément aux dispositions des articles L.335-2 et suivants du
            Code de Propriété Intellectuelle.
          </Text>

          <Text className="text-white mb-3">
            Le non-respect de cette interdiction constitue une contrefaçon
            pouvant engager la responsabilité civile et pénale du contrefacteur.
            En outre, les propriétaires des Contenus copiés pourraient intenter
            une action en justice à votre encontre.
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Limitations de responsabilité.
          </Text>

          <Text className="text-white mb-3">
            L’utilisateur du site s’engage à accéder au site en utilisant un
            matériel récent, ne contenant pas de virus et avec un navigateur de
            dernière génération mis-à-jour.
          </Text>

          <Text className="text-white mb-3">
            Lucas TAMAYA ne pourra être tenue responsable des dommages directs
            et indirects causés au matériel de l’utilisateur, lors de l’accès au
            site https://portfolio3-0-lucastamaya.vercel.app/, et résultant soit
            de l’utilisation d’un matériel ne répondant pas aux spécifications
            indiquées cidessus, soit de l’apparition d’un bug ou d’une
            incompatibilité.
          </Text>

          <Text className="text-white mb-3">
            Lucas TAMAYA ne pourra également être tenue responsable des dommages
            indirects (tels par exemple qu’une perte de marché ou perte d’une
            chance) consécutifs à l’utilisation du site
            https://portfolio3-0-lucastamaya.vercel.app/.
          </Text>

          <Text className="text-white mb-3">
            Des espaces interactifs (possibilité de poser des questions dans
            l’espace contact) sont à la disposition des utilisateurs. Lucas
            TAMAYA se réserve le droit de supprimer, sans mise en demeure
            préalable, tout contenu déposé dans cet espace qui contreviendrait à
            la législation applicable en France, en particulier aux dispositions
            relatives à la protection des données.
          </Text>

          <Text className="text-white mb-3">
            Le cas échéant, Lucas TAMAYA se réserve aussi la possibilité de
            mettre en cause la responsabilité civile et/ou pénale de
            l’utilisateur, notamment en cas de message à caractère diffamant,
            raciste, injurieux ou pornographique, quel que soit le support
            utilisé (texte, vidéo, photographie…).
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Gestion des données personnelles.
          </Text>

          <Text className="text-white mb-3">
            En France, les données personnelles sont notamment protégées par la
            loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004,
            l’article L. 226-13 du Code pénal et la Directive Européenne du 24
            octobre 1995.
          </Text>

          <Text className="text-white mb-3">
            A l’occasion de l’utilisation du site
            https://portfolio3-0-lucastamaya.vercel.app/, peuvent être
            recueillies : l’URL des liens par l’intermédiaire desquels
            l’utilisateur a accédé au site «URL du site Internet», le
            fournisseur d’accès de l’utilisateur, l’adresse de protocole
            Internet (IP) de l’utilisateur.
          </Text>

          <Text className="text-white mb-3">
            En tout état de cause Lucas TAMAYA ne collecte des informations
            personnelles relatives à l’utilisateur que pour le besoin de
            certains services proposés par le site https://portfolio3-0-
            lucastamaya.vercel.app/. L’utilisateur fournit ces informations en
            toute connaissance de cause, notamment lorsqu’il procède par
            lui-même à leur saisie. Il est alors précisé à l’utilisateur du site
            https://portfolio3-0-lucastamaya.vercel.app/ l’obligation ou non de
            fournir ces informations.
          </Text>

          <Text className="text-white mb-3">
            Conformément aux dispositions des articles 38 et suivants de la loi
            78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et
            aux libertés, tout utilisateur dispose d’un droit d’accès, de
            rectification et d’opposition aux données personnelles le
            concernant, en effectuant sa demande écrite et signée, accompagnée
            d’une copie du titre d’identité avec signature du titulaire de la
            pièce, en précisant l’adresse à laquelle la réponse doit être
            envoyée.
          </Text>

          <Text className="text-white mb-3">
            Aucune information personnelle de l’utilisateur du site
            https://portfolio3-0- lucastamaya.vercel.app/ n’est publiée à l’insu
            de l’utilisateur, échangée, transférée, cédée ou vendue sur un
            support quelconque à des tiers. Seule l’hypothèse du rachat de Lucas
            TAMAYA et/ou du site internet
            https://portfolio3-0-lucastamaya.vercel.app/ et de ses droits
            permettrait la transmission des dites informations à l’éventuel
            acquéreur qui serait à son tour tenu de la même obligation de
            conservation et de modification des données vis à vis de
            l’utilisateur du site
          </Text>

          <Text className="text-white mb-3">
            Les bases de données sont protégées par les dispositions de la loi
            du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996
            relative à la protection juridique des bases de données.
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Liens hypertextes et cookies.
          </Text>

          <Text className="text-white mb-3">
            Le site https://portfolio3-0-lucastamaya.vercel.app/ peut contenir
            un certain nombre de liens hypertextes vers d’autres sites, mis en
            place avec l’autorisation de Lucas TAMAYA.
          </Text>

          <Text className="text-white mb-3">
            Cependant, Lucas TAMAYA n’a pas la possibilité de vérifier le
            contenu des sites ainsi visités, et n’assumera en conséquence aucune
            responsabilité de ce fait.
          </Text>

          <Text className="text-white mb-3">
            La navigation sur le site
            https://portfolio3-0-lucastamaya.vercel.app/ est susceptible de
            provoquer l’installation de cookie(s) sur l’ordinateur de
            l’utilisateur.
          </Text>

          <Text className="text-white mb-3">
            Un cookie est un fichier de petite taille, qui ne permet pas
            l’identification de l’utilisateur, mais qui enregistre des
            informations relatives à la navigation d’un ordinateur sur un site.
            Les données ainsi obtenues visent à faciliter la navigation
            ultérieure sur le site, et ont également vocation à permettre
            diverses mesures de fréquentation.
          </Text>

          <Text className="text-white mb-3">
            Le refus d’installation d’un cookie peut entraîner l’impossibilité
            d’accéder à certains services. L’utilisateur peut toutefois
            configurer son ordinateur de la manière suivante, pour refuser
            l’installation des cookies :
          </Text>

          <Text className="text-white mb-3">
            &omicron; Sous Internet Explorer : onglet outil (pictogramme en
            forme de rouage en haut a droite) / options internet. Cliquez sur
            Confidentialité et choisissez Bloquer tous les cookies. Validez sur
            Ok.
          </Text>
          <Text className="text-white mb-3">
            &omicron; Sous Firefox : en haut de la fenêtre du navigateur,
            cliquez sur le bouton Firefox, puis aller dans l’onglet Options.
            Cliquer sur l’onglet Vie privée.
          </Text>
          <Text className="text-white mb-3">
            &omicron; Paramétrez les Règles de conservation sur : utiliser les
            paramètres personnalisés pour l’historique. Enfin décochez-la pour
            désactiver les cookies.
          </Text>
          <Text className="text-white mb-3">
            &omicron; Sous Safari : Cliquez en haut à droite du navigateur sur
            le pictogramme de menu (symbolisé par un rouage). Sélectionnez
            Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la
            section “Confidentialité”, cliquez sur Paramètres de contenu. Dans
            la section “Cookies”, vous pouvez bloquer les cookies.
          </Text>
          <Text className="text-white mb-3">
            &omicron; Sous Chrome : Cliquez en haut à droite du navigateur sur
            le pictogramme de menu (symbolisé par trois lignes horizontales).
            Sélectionnez Paramètres. Cliquez sur Afficher les paramètres
            avancés. Dans la section “Confidentialité”, cliquez sur préférences.
          </Text>

          <Text className="text-white mb-3">
            Dans l’onglet “Confidentialité”, vous pouvez bloquer les cookies.
            Les liens hypertextes mis en place dans le cadre du présent site
            internet en direction d'autres ressources présentes sur le réseau
            Internet ne sauraient engager la responsabilité de Lucas TAMAYA.
          </Text>

          <Text className="text-white mb-3">
            Tout contenu téléchargé se fait aux risques et périls de
            l'utilisateur et sous sa seule responsabilité. En conséquence, Lucas
            TAMAYA ne saurait être tenu responsable d'un quelconque dommage subi
            par l'ordinateur de l'utilisateur ou d'une quelconque perte de
            données consécutives au téléchargement.
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Droit applicable et attribution de juridiction.
          </Text>
          <Text className="text-white mb-3">
            Les présentes conditions du site
            https://portfolio3-0-lucastamaya.vercel.app/ sont régies par les
            lois françaises et toute contestation ou litiges qui pourraient
            naître de l'interprétation ou de l'exécution de celles-ci seront de
            la compétence exclusive des tribunaux dont dépend le siège social de
            la société Lucas TAMAYA. La langue de référence, pour le règlement
            de contentieux éventuels, est le français.
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Les principales lois concernées.
          </Text>

          <Text className="text-white mb-3">
            Loi n° 78-17 du 6 janvier 1978, notamment modifiée par la loi n°
            2004-801 du 6 août 2004 relative à l’informatique, aux fichiers et
            aux libertés. Loi n° 2004-575 du 21 juin 2004 pour la confiance dans
            l’économie numérique.
          </Text>

          <Text className="text-white text-lg mt-10 mb-3 font-bold">
            Lexique
          </Text>

          <Text className="text-white mb-3">
            &omicron; Propriétaire du site : Responsable légal des informations
            contenues dans le site internet
          </Text>
          <Text className="text-white mb-3">
            &omicron; Webmaster : Personne en charge du maintien technique et
            des mises à jour techniques du site internet
          </Text>
          <Text className="text-white mb-3">
            &omicron; Responsable publication : Personne en charge de la mise à
            jour des contenus (textes, visuels, multimédia, etc.) sur le site
            internet
          </Text>
          <Text className="text-white mb-3">
            &omicron; Hébergeur : Espace de stockage du site internet
          </Text>
          <Text className="text-white mb-3">
            &omicron; Utilisateur : Internaute se connectant, utilisant le site
            susnommé.
          </Text>
          <Text className="text-white mb-3">
            &omicron; Informations personnelles : « les informations qui
            permettent, sous quelque forme que ce soit, directement ou non,
            l’identification des personnes physiquesauxquelles elles
            s’appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
