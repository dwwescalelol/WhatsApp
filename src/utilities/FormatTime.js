import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function formatTime(timestamp) {
  const now = dayjs();
  return dayjs(timestamp).from(now);
}
