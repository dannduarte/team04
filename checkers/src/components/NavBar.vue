navbar.vue games

<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <div class="dropdown">
      <button class="dropbtn">Games</button>
      <div class="dropdown-content">
        <router-link to="/game">All Games Overview</router-link>
        <a href="#">Game details </a>
        <a href="#">Games edit </a>
      </div>
    </div>
    <a href="">Play</a>
    <a href="">My Account</a>

    <!-- Right aligned nav items -->
    <div class="rightSection">
      <a href="">Sign up</a>
      <a href="">Log in</a>
      <button @click="isOpen = true">Spelregels</button>
      <Modal :open="isOpen" @close="isOpen = !isOpen">
        <p>
          Spelregels<br>
          1. Leg het dambord zo, dat het hoekveld linksonder een donker vakje is. Er wordt op de donkere velden gedamd.<br>
          2. Wit begint en doet de eerste zet.<br>
          3. Een schijf wordt één vakje schuin vooruit geschoven.<br>
          4. Een schijf kan vooruit en achteruit slaan.<br>
          5. Een schijf die aan de overkant van het dambord komt, wordt een dam. Let op: een schijf die tijdens het slaan de overkant van het dambord passeert maar weer terug moet om nog meer schijven te slaan, blijft een schijf.<br>
          6. Een dam wordt één of meer vakjes schuin vooruit of schuin achteruit geschoven.<br>
          7. Een dam kan vooruit en achteruit slaan. Je hoeft de dam na de slag niet vlak achter de laatste geslagen schijf te zetten.<br>
          8. Slaan is verplicht.<br>
          9. Meerslag gaat voor.<br>
          10. Als je met een dam en met een schijf evenveel stukken kunt slaan, mag je kiezen. Dus: damslag gaat niet voor!<br>
          11. Pas na het slaan mag je de geslagen stukken van het bord pakken.<br>
          12. Tijdens het slaan mag je niet twee keer over hetzelfde stuk. Wel twee keer over hetzelfde lege veld.<br>
          13. Aanraken is zetten: als je een dam of schijf aanraakt waar je een reglementaire zet mee kunt doen, dan moet je met dát stuk een zet doen.<br>
          14. Als je tegenstander een zet doet die niet volgens de spelregels is (bijvoorbeeld hij vergeet te slaan, of hij slaat te weinig stukken), dan is het sportief om dat tegen hem te zeggen en hem te laten terugzetten. Maar je mag ook gewoon doorspelen.<br>
          15. Wie geen zet meer kan doen, heeft de partij verloren.<br>
          16. Als niemand meer kan winnen, dan is het remise (gelijkspel). Let op: het kan ook remise zijn als jij en je tegenstander niet hetzelfde aantal stukken hebben!<br>
        </p>
      </Modal>
    </div>
  </nav>
</template>

<script>

import { ref } from "vue"
import Modal from "./Games/GameRules.vue";

export default {
  components: { Modal },

  setup () {
    const isOpen = ref(false)

    return { isOpen }
  }
}

</script>