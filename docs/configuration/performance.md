# Performance

The defaults are chosen to be safe on modest hardware. On a machine with a large library and cores
to spare, a few settings are worth revisiting — and one of them matters more than the rest.

Change one thing at a time and watch the result. Every setting here trades one resource for another,
so a value that helps one installation can hurt the next.

## Reading the library in parallel

Before UMS can present a file, it has to work out what it is: read the metadata, find the artwork,
determine what the requesting device needs. This is the single biggest factor in how long a scan
takes and how quickly a large folder opens, and it is done by a pool of worker threads.

```
# How many files UMS works on at once. Default 4, allowed 1 to 64.
media_resolve_threads = 4
```

The work is dominated by waiting — for the disk, for the database, occasionally for the network — so
more threads help well beyond the number of cores you have. On a server with a large library, a
value in the region of the core count or above is reasonable. On a small machine, or one where UMS
shares the disk with something else, leave it alone.

This setting also sizes the pool of database connections, which is kept at twice the number of
threads and never below ten. That is deliberate: worker threads need connections, and raising the
threads without the connections to go with them would leave them queueing for one another. Because
the two move together, there is nothing separate to adjust.

## Database memory

The database keeps recently used pages in memory. How much it may use is decided automatically, and
that is normally the right answer:

```
# Database cache in KB. Default -1, which lets UMS decide.
database_media_cache_size = -1
```

Two further switches trade memory for speed. Both are off by default and both are worth a
measurement rather than a guess:

```
# Hold database indexes in memory.
database_media_use_memory_indexes = FALSE

# Let the cache give memory back under pressure instead of holding it.
database_media_use_cache_soft = FALSE
```

Memory indexes make lookups faster at the cost of memory that is then unavailable for anything else.
The soft cache is the opposite trade: it releases memory when the system needs it, which keeps UMS
out of trouble on a machine that is short of memory, at the price of having to read those pages
again afterwards.

## Logging

By default UMS writes each log line out as it happens. Buffering makes logging cheaper:

```
# Collect log lines before writing them out. Off by default.
logging_buffered = FALSE
```

The catch shows up exactly when you need the log most. If UMS is killed or crashes, whatever is
still in the buffer is lost, so the log can stop short of the event you are investigating — and an
abruptly ending log then looks like a freeze that never happened. Leave buffering off while chasing
a problem.

## What to measure

Two numbers tell you whether a change helped:

- How long a full scan of your library takes. It is in the log, as a line reporting the media scan
  completed and the number of seconds it needed.
- How long it takes to open your largest folder in a control point, once after a restart and once
  again straight afterwards. The first time includes the work of building the folder, the second
  does not, and the difference is what these settings act on.
