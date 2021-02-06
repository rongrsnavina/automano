# automano
![Schedule](https://github.com/roeyb/automano/workflows/Main/badge.svg?event=schedule)

## How to use this repo?
1. Fork it
2. Add [*Repository Secrets*](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) `MECKANO_USER`,`MECKANO_PASS` to your forked repo.
3. It will run twice daily, change the cron definition in `.github/workflows/run.yml` if you need to.

## TODO
* Do not run on Israeli holidays
