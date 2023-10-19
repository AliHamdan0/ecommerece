import { Helpers } from '@/utilities/helpers';
import { PaginationItem, Pagination } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
export const PaginationInc = ({ size = 6, count, page, setPage }) => {
  const Router = useRouter();
  const [addToUrl] = Helpers();
  const FindNewPath = (nextPage) => {
    //when we want to open it in a new tab
    if (window.location.search.indexOf('page=') == -1)
      return `${window.location.search}?page=${nextPage}`;
    else {
      let p = window.location.search.indexOf('page=');
      let before = window.location.search.substring(0, p - 1);
      let after =
        `?page=${nextPage}&` +
        window.location.search.substring(p + 5 + (nextPage + '').length + 1);
      return `${before}${after}`;
    }
  };
  return (
    <Pagination
      page={page}
      size='large'
      count={Math.ceil(count / size)}
      color='primary'
      showFirstButton
      showLastButton
      onChange={(e, v) => {
        e.preventDefault();
        setPage(v);
      }}
      renderItem={(item) => {
        return (
          <Link
            href={FindNewPath(item.page)}
            onContextMenu={(e) => {
              // e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
              if (item?.page > 0 && item?.page <= Math.ceil(count / size))
                addToUrl({ page: item.page });
            }}
          >
            <PaginationItem
              // className={item.page === page ? style.fw : ''}
              sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                color: 'primary.main',
                // minWidth: { xs: '24px', md: '32px' },
                // maxHeight: { xs: '24px', md: '32px' },
              }}
              {...item}
            />
          </Link>
        );
      }}
    />
  );
};
