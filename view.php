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
 * Prints an instance of mod_mamografsim.
 *
 * @package     mod_mamografsim
 * @copyright   2020 cc5402-Mamografías
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require(__DIR__.'/../../config.php');
require_once(__DIR__.'/lib.php');


// Course_module ID, or
$id = optional_param('id', 0, PARAM_INT);

// ... module instance id.
$m  = optional_param('m', 0, PARAM_INT);

if ($id) {
    $cm             = get_coursemodule_from_id('mamografsim', $id, 0, false, MUST_EXIST);
    $course         = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $moduleinstance = $DB->get_record('mamografsim', array('id' => $cm->instance), '*', MUST_EXIST);
} else if ($m) {
    $moduleinstance = $DB->get_record('mamografsim', array('id' => $n), '*', MUST_EXIST);
    $course         = $DB->get_record('course', array('id' => $moduleinstance->course), '*', MUST_EXIST);
    $cm             = get_coursemodule_from_instance('mamografsim', $moduleinstance->id, $course->id, false, MUST_EXIST);
} else {
    print_error(get_string('missingidandcmid', 'mod_mamografsim'));
}

require_login($course, true, $cm);

$modulecontext = context_module::instance($cm->id);

/*$event = \mod_mamografsim\event\course_module_viewed::create(array(
    'objectid' => $moduleinstance->id,
    'context' => $modulecontext
));
$event->add_record_snapshot('course', $course);
$event->add_record_snapshot('mamografsim', $moduleinstance);
$event->trigger();
*/

$PAGE->set_url('/mod/mamografsim/view.php', array('id' => $cm->id));
$PAGE->set_title(format_string($moduleinstance->name));
$PAGE->set_heading(format_string($course->fullname));
$PAGE->set_context($modulecontext);

/*
foreach ($moduleinstance as $key=>$value){
    echo("key:" . $key . " value:" . $value . "\n");

}
unset($value);
*/
//Errores
$errorvis = $moduleinstance->errorvis;
$errorrep = $moduleinstance->errorrep;
$errorlin = $moduleinstance->errorlin;
$errorrend = $moduleinstance->errorrend;
$errorf = $moduleinstance->errorf;
$erroralt = $moduleinstance->erroralt;
$errorimglin = $moduleinstance->errorimglin;
$errorimgsp = $moduleinstance->errorimgsp;
$errorvmp = $moduleinstance->errorvmp;
//Pruebas
$compresion = $moduleinstance->compresion;
$compresion_label = $moduleinstance->compresion_label;

$rendimiento = $moduleinstance->rendimiento;
$rendimiento_label = $moduleinstance->rendimiento_label;

$imagen = $moduleinstance->imagen;
$imagen_label = $moduleinstance->imagen_label;

$hemirreductor = $moduleinstance->hemirreductor;
$hemirreductor_label = $moduleinstance->hemirreductor_label;
$PAGE->requires->js_call_amd('mod_mamografsim/main','init',
    array(
        array(
            array('errorrep',$errorrep),
            array('errorlin',$errorlin),
            array('errorrend',$errorrend),
            array('errorf',$errorf),
            array('erroralt',$erroralt),
            array('errorvis',$errorvis),
            array('errorimglin',$errorimglin),
            array('errorimgsp',$errorimgsp),
            array('errorvmp',$errorvmp)
        ),
        array(
            array($compresion,$compresion_label),
            array($rendimiento,$rendimiento_label),
            array($imagen,$imagen_label),
            array($hemirreductor,$hemirreductor_label)

    )
));

$PAGE->requires->js_call_amd('mod_mamografsim/main-aux','init2',
    array(
        array(
            array('errorrep',$errorrep),
            array('errorlin',$errorlin),
            array('errorrend',$errorrend),
            array('errorf',$errorf),
            array('erroralt',$erroralt),
            array('errorvis',$errorvis),
            array('errorimglin',$errorimglin),
            array('errorimgsp',$errorimgsp),
            array('errorvmp',$errorvmp)
        )
        
));
$PAGE->requires->js_call_amd('mod_mamografsim/control-panel','init');




echo $OUTPUT->header();

readfile("interfaces.html");


echo $OUTPUT->footer();
