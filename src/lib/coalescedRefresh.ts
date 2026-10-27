// Serialize refreshes and reconcile once more if updates arrive during a read.
export function coalescedRefresh(read: () => Promise<void>) {
  let running: Promise<void> | undefined;
  let pending = false;
  let disposed = false;

  const refresh = (): Promise<void> => {
    if (disposed) return Promise.resolve();
    pending = true;
    if (running) return running;
    running = (async () => {
      try {
        while (pending && !disposed) {
          pending = false;
          await read();
        }
      } finally {
        running = undefined;
      }
    })();
    return running;
  };

  return { refresh, dispose: () => { disposed = true; pending = false; } };
}