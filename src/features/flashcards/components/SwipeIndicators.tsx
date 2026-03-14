import { SWIPE_ACTIONS } from '../constants';
import type { SwipeDirection } from '../types';

interface SwipeIndicatorsProps {
  dragDirection: SwipeDirection | null;
}

const SwipeIndicators = ({ dragDirection }: SwipeIndicatorsProps) => {
  return (
    <div className="swipe-indicators">
      {SWIPE_ACTIONS.map((action) => {
        const isFavoriteRemoving = action.direction === 'up' && dragDirection === 'down';

        return (
        <div
          key={action.direction}
          className={`indicator indicator-${action.direction} ${dragDirection === action.direction ? 'active' : ''} ${isFavoriteRemoving ? 'removing' : ''}`}
        >
          <span className="indicator-icon">
            <action.icon aria-hidden="true" />
          </span>
          <span className="indicator-label">{action.label}</span>
        </div>
        );
      })}
    </div>
  );
};

export default SwipeIndicators;
