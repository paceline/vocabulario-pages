# encoding: utf-8
#
# A (hopefully) helpful set of rake tasks for Jekyll
# https://github.com/paceline/jekyll-rake-tasks
#
# Version: 0.0.1 (201404260000)
#
# Copyright (c) 2014 Ulf Möhring, http://www.moehring.me
# Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)

require 'active_support/core_ext/string/inflections'
I18n.enforce_available_locales = false

#
# Settings
#

# Your site's default page name
filename = "index.textile"

# Define your page template
page_template = "---
layout: default
title: {{title}}
---

h1. {{title}}

"

# Define your index template
index_template = "---
layout: default
title: {{title}}
---

{% toc %}
"

#
# Tasks
#

# Make new page default action
task default: %w[new_page]

# Creates a new page
task :new_page, :title do |t, args|
  title = args.title ? args.title : get_stdin("Enter a title for your page: ")
  directory = File.join(get_stdin("Enter a sub directory for your page: "), title.parameterize)
  mkdir_p directory
  dirs = directory.split(File::SEPARATOR)
  0.upto(dirs.length-2) do |i|
    index = File.join(dirs[0..i] << filename)
    unless File.exists?(index)
      open(index, 'w') { |f| f << index_template.gsub("{{title}}", dirs[i].humanize) }
    end
  end
  open(File.join(directory, filename), 'w') { |f| f << page_template.gsub("{{title}}", title) }
end

# Helper methods
def get_stdin(message)
  print message
  STDIN.gets.chomp
end
