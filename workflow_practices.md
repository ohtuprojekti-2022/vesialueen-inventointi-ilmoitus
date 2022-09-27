# Workflow guide
_Please follow this guideline during the project_

## What's happened?
* Check Slack and Telegram for new messages
* Check taskboard [sprint backlog](https://docs.google.com/spreadsheets/d/1nCVv4__ZBgJAmnxx4Y7evX8--HsfqhYL4azqnDb5UFg/edit#gid=625081244)
* Check new commits from git repos:
  * [frontend](https://github.com/ohtuprojekti-2022/vesialue-front/tree/staging)
  * [backend](https://github.com/ohtuprojekti-2022/vesialue-back/tree/staging)
* Also see all GitHub activity from organization’s [dashboard](https://github.com/orgs/ohtuprojekti-2022/dashboard)

## Start working
* **Check out a task** from the sprint backlog and update the status column accordingly (_In progress_ etc.)
  * Notify others on Slack's story-channel, when you start working on the task
* Follow [git workflow](#git-workflow)

## Git workflow
* `git pull origin main`
* `git checkout <branch-name>`

### Task done
* `git add -a /-p`
* `git commit -m "Commit message"`
* `git push`
* Mark Status as "Done" and update estimate in sprint backlog 

#### Write new tasks or ideas
* _After finishing a task you'll probably notice something that should/could be done next. Now is a great time to write them down for others to see_
* _Perhaps post your ideas to Slack or Telegram_

### Story done
* `git merge development`
  * Merge conflict?
    * Solve conflict
    * `git add -a`
    * `git commit -m "Solved merge conflict with <branch-name>"`
    * `git push`
* `git checkout development`
* `git merge <branch-name>`
* `git push`
* Mark Status as "Done" and Finished in _sprint_ in product backlog

## End working
* **Mark your working hours** in [sprint backlog](https://docs.google.com/spreadsheets/d/1nCVv4__ZBgJAmnxx4Y7evX8--HsfqhYL4azqnDb5UFg/edit#gid=625081244)

