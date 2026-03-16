"""Raw export formatter — CSV/JSON dump of full dataset.

For ad-hoc analysis or consumers that need unprocessed data.
PII is stripped by default.
"""

import pandas as pd
from pathlib import Path

from ._shared import strip_pii


def format_raw_export(
    raw_df: pd.DataFrame,
    output_dir: Path,
    date_from: str,
    date_to: str,
) -> Path:
    """Write raw CSV. PII is always stripped — no escape hatch."""
    df = strip_pii(raw_df)

    out_path = output_dir / "raw" / f"raw_{date_from}_to_{date_to}.csv"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(out_path, index=False)

    return out_path
