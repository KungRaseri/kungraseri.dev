<template>
<v-card class="elevation-12">
    <v-toolbar dark color="primary">
        <v-toolbar-title>Class</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
        <v-form v-bind="heroClass">
            <v-container fluid>
                <v-text-field v-model="heroClass.name" prepend-icon="label" name="name" label="Name" type="text"></v-text-field>
                <v-text-field v-model="heroClass.description" prepend-icon="note" name="description" label="Description"></v-text-field>
                <v-layout>
                    <v-flex xs2>
                        <v-text-field v-model="heroClass.base_attributes.STRENGTH" name="strength" label="STR"></v-text-field>
                        <v-text-field v-model="heroClass.base_attributes.CONSTITUTION" name="constitution" label="CON"></v-text-field>
                        <v-text-field v-model="heroClass.base_attributes.ENDURANCE" name="endurance" label="END"></v-text-field>
                        <v-text-field v-model="heroClass.base_attributes.DEXTERITY" name="dexterity" label="DEX"></v-text-field>
                        <v-text-field v-model="heroClass.base_attributes.INTELLECT" name="intellect" label="INT"></v-text-field>
                        <v-text-field v-model="heroClass.base_attributes.WISDOM" name="wisdom" label="WIS"></v-text-field>
                        <v-text-field v-model="heroClass.base_attributes.CHARISMA" name="charisma" label="CHA"></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field v-model="heroClass.base_max_health" name="charisma" label="Base Max Health"></v-text-field>
                        <v-text-field v-model="heroClass.max_health_per_level" name="charisma" label="Max Health Per Level"></v-text-field>
                        <v-text-field v-model="heroClass.base_max_mana" name="charisma" label="Base Max Mana"></v-text-field>
                        <v-text-field v-model="heroClass.max_mana_per_level" name="charisma" label="Max Mana Per Level"></v-text-field>
                        <v-text-field v-model="heroClass.mana_regen_per_level" name="charisma" label="Mana Regen Per Level"></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-text-field v-model="heroClass.tier" name="tier" label="Tier"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs4>
                        <v-checkbox v-model="heroClass.default" prepend-icon="flag" name="default" label="Default"></v-checkbox>
                        <v-checkbox v-model="heroClass.wildcard_permission" prepend-icon="flag" name="wildcardPermission" label="Wildcard Permission"></v-checkbox>
                    </v-flex>
                    <v-flex xs4>
                        <v-checkbox v-model="heroClass.primary" prepend-icon="flag" name="primary" label="Primary"></v-checkbox>
                        <v-checkbox v-model="heroClass.secondary" prepend-icon="flag" name="secondary" label="Secondary"></v-checkbox>
                    </v-flex>
                    <v-flex xs4>
                        <v-checkbox v-model="heroClass.run_command.as_console" prepend-icon="flag" name="runCommandAsConsole" label="As Console"></v-checkbox>
                        <v-text-field v-model="heroClass.run_command.command" prepend-icon="flag" name="runCommandCommands" label="Commands"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info">Clear</v-btn>
        <v-btn color="primary" @click="saveClass">Add Class</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import { mapActions } from "vuex";
import yaml from "yamljs";

export default {
  name: "HeroClassForm",
  data() {
    return {
      heroClass: {
        name: "",
        default: false,
        wildcard_permission: false,
        primary: true,
        secondary: false,
        description: "",
        run_command: {
          as_console: true,
          command: []
        },
        stamina: {
          costs: {
            miss: 150,
            swing_hit: -75,
            sprinting: 0,
            taken_hit: 20,
            jump: 50
          },
          stopRegen: {
            swing_hit: {
              enable: false,
              time: 10000
            },
            miss: {
              enable: false,
              time: 10000
            },
            sprinting: {
              enable: false,
              time: 10000
            },
            taken_hit: {
              enable: false,
              time: 10000
            },
            jump: {
              enable: false,
              time: 10000
            }
          }
        },
        base_attributes: {
          STRENGTH: 1,
          CONSTITUTION: 1,
          ENDURANCE: 1,
          DEXTERITY: 1,
          INTELLECT: 1,
          WISDOM: 1,
          CHARISMA: 1
        },
        permitted_armor: ["ALL"],
        permitted_weapon: ["ALL"],
        permitted_offhand: ["ALL"],
        permitted_skills: ["ALL"],
        experience_sources: ["ALL"],
        base_max_health: 20,
        max_health_per_level: 0.1,
        base_max_mana: 75,
        max_mana_per_level: 1,
        base_mana_regen: 1,
        mana_regen_per_level: 0.05,
        exp_modifier: 1.0,
        item_damage: [
          {
            air: 1
          }
        ],
        item_damage_level: [
          {
            air: 0.1
          }
        ],
        projectile_damage: [
          {
            Arrow: 3
          }
        ],
        projectile_damage_level: [
          {
            Arrow: 0.1
          }
        ],
        exp_loss: 0,
        tier: 0,
        recipes: ["default"]
      }
    };
  },
  methods: {
    ...mapActions(["addEditHeroClass", "updateHeroes"]),
    saveClass() {
      var yamlString = yaml.stringify(this.heroClass, 4);
      yamlString = yamlString.replace("_", "-");
      // eslint-disable-next-line
      console.log(yamlString);
      this.updateHeroes(this.heroClass);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
</style>
