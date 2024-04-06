#!/bin/sh
#
# This script makes use of gpio-sim to create a fake chip so our test suite can
# check if the library is doing its job. 
#
# Without it all testcases will fail.

# for gpiod 2.x 
# see https://docs.kernel.org/admin-guide/gpio/gpio-sim.html
# modprobe gpio-sim
# mkdir -p /sys/kernel/config/gpio-sim/fakegpio/gpio-bank0/line0
# echo 1 > /sys/kernel/config/gpio-sim/fakegpio/live
# chmod a+rw /dev/gpiochip*

# for gpiod 1.x
# see https://docs.kernel.org/admin-guide/gpio/gpio-mockup.html
# modprobe gpio-mockup gpio_mockup_ranges=-1,40 gpio_mockup_named_lines
# 