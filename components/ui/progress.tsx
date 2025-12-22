import { Progress as BaseProgress } from '@base-ui/react/progress';

export function Progress({
  value
}) {
  return (
    <BaseProgress.Root className="grid w-full grid-cols-2 gap-y-2" value={value}>
      <BaseProgress.Track className="col-span-full h-1 overflow-hidden rounded bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200 dark:bg-gray-800 dark:shadow-gray-800">
        <BaseProgress.Indicator className="block bg-gray-500 dark:bg-gray-400 transition-all duration-500" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
