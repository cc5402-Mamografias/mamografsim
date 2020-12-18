<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * The main mod_mamografsim configuration form.
 *
 * @package     mod_mamografsim
 * @copyright   2020 cc5402-Mamografías
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot.'/course/moodleform_mod.php');

/**
 * Module instance settings form.
 *
 * @package    mod_mamografsim
 * @copyright  2020 cc5402-Mamografías
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class mod_mamografsim_mod_form extends moodleform_mod {

    /**
     * Defines forms elements
     */
    public function definition() {
        global $CFG;
        global $DB;
        $mform = $this->_form;

        // Adding the "general" fieldset, where all the common settings are shown.
        $mform->addElement('header', 'general', get_string('general', 'form'));

        // Adding the standard "name" field.
        $mform->addElement('text', 'name', get_string('mamografsimname', 'mod_mamografsim'), array('size' => '64'));

        if (!empty($CFG->formatstringstriptags)) {
            $mform->setType('name', PARAM_TEXT);
        } else {
            $mform->setType('name', PARAM_CLEANHTML);
        }
        
        
        $mform->addRule('name', null, 'required', null, 'client');
        $mform->addRule('name', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');
        $mform->addHelpButton('name', 'mamografsimname', 'mod_mamografsim');

        
        //$mform->addHelpButton('test', 'mamografsimname', 'mod_mamografsim');

        // Adding the standard "intro" and "introformat" fields.
        if ($CFG->branch >= 29) {
            $this->standard_intro_elements();
        } else {
            $this->add_intro_editor();
        }

        // Adding the rest of mod_mamografsim settings, spreading all them into this fieldset
        // ... or adding more fieldsets ('header' elements) if needed for better logic.
        // $mform->addElement('static', 'label1', 'mamografsimsettings', get_string('mamografsimsettings', 'mod_mamografsim'));
        $mform->addElement('header', 'mamografsimact', get_string('mamografsimact', 'mod_mamografsim'));
        $pruebas2 = array(
            'compresion' => 'Fuerza de Compresión y Precisión de Espesor',
            'rendimiento' => 'Rendimiento: Repetibilidad y Linealidad',
            'imagen' => 'Control de Calidad de un Objeto de Prueba y Artefactos en el Receptor de Imagen'
        );
        
        $pruebasitem = array();
        foreach ($pruebas2 as $key => $value) {
         $pruebasitem[] = &$mform->createElement('advcheckbox',$key, '', $value, array('name' => $key,'group'=>1), $key);
         $mform->setDefault($key, true);
         $mform->addElement('hidden', "{$key}_label",$value);
         $mform->setType("{$key}_label", PARAM_TEXT);
         
        }
        $mform->addGroup($pruebasitem, 'pruebas',"Pruebas disponibles",' ',false);
        
        
        $mform->addRule('pruebas', get_string('required'), 'required', null, 'client');

        
        $mform->addElement('header', 'mamografsimcomp', get_string('mamografsimcomp', 'mod_mamografsim'));

        $mform->addElement('select', 'errorvis', "Error indicador fuerza compresión", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Ninguno (El visor muestra la misma fuerza que la balanza)','Bajo'=>'Bajo (El visor presenta un error dentro de valores de tolerancia)','Alto'=>'Alto (El visor presenta un error mayor a los valores de tolerancia)'));
        $mform->setType('errorvis', PARAM_TEXT);
        $mform->addRule('errorvis', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');


        $mform->addElement('select', 'errorf', "Fuerza máxima", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Dentro de los valores de tolerancia','Alto'=>'Fuera de los valores de tolerancia'));
        $mform->setType('errorf', PARAM_TEXT);

        $mform->addRule('errorf', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');
        

        $mform->addElement('select', 'erroralt', "Error espesor de compresión", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Ninguno (El mamógrafo mide el espesor exacto de los objetos)','Bajo'=>'Bajo (El mamógrafo presenta un error dentro del rango deseable)','Medio'=>'Medio (El mamógrafo presenta un error dentro del rango aceptable)','Alto'=>'Alto (El mamógrafo presenta un error mayor al rango aceptable)'));
        $mform->setType('erroralt', PARAM_TEXT);
        $mform->addRule('erroralt', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');



        $mform->addElement('header', 'mamografsimrend', get_string('mamografsimrend', 'mod_mamografsim'));

        $mform->addElement('select', 'errorrep', "Error Repetibilidad", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Los resultados no presentan variación','Bajo'=>'Grado de variación bajo','Medio'=>'Medio','Alto'=>'Alto'));
        $mform->setType('errorrep', PARAM_TEXT);
        
        $mform->addRule('errorrep', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');

        $mform->addElement('select', 'errorlin', "Error Linealidad", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Ninguno','Bajo'=>'Bajo','Medio'=>'Medio','Alto'=>'Alto'));
        $mform->setType('errorlin', PARAM_TEXT);
        
        $mform->addRule('errorlin', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');

        $mform->addElement('select', 'errorrend', "Error Rendimiento", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Ninguno','Bajo'=>'Bajo','Medio'=>'Medio','Alto'=>'Alto'));
        $mform->setType('errorrend', PARAM_TEXT);
        
        $mform->addRule('errorrend', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');

        // prueba imagen
        $mform->addElement('header', 'mamografsimimg', get_string('mamografsimimg', 'mod_mamografsim'));

        $mform->addElement('select', 'errorimglin', "Error Cualitativo - Lineas", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Imagen limpia','Vertical'=>'Imagen con lineas verticales','Horizontal'=>'Imagen con lineas horizontales'));
        $mform->setType('errorimglin', PARAM_TEXT);
        $mform->addRule('errorimglin', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');

        $mform->addElement('select', 'errorimgsp', "Error Cualitativo - Puntos blancos y negros", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Imagen limpia','Bajo'=>'Pocos puntos','Alto'=>'Muchos puntos'));
        $mform->setType('errorimgsp', PARAM_TEXT);
        $mform->addRule('errorimgsp', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');

        $mform->addElement('select', 'errorvmp', "Error de Contraste", array('Aleatorio'=>'Aleatorio','Ninguno'=>'Ninguno','Bajo'=>'Bajo','Alto'=>'Alto'));
        $mform->setType('errorvmp', PARAM_TEXT);
        $mform->addRule('errorvmp', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');

        // Add standard grading elements.
        //$this->standard_grading_coursemodule_elements();

        // Add standard elements.
        $this->standard_coursemodule_elements();

        // Add standard buttons.
        $this->add_action_buttons();
    }
}
