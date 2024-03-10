package org.jio.orchidbe.repositorys.products;

import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.orders.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    Page<Bid> findAll(Specification<Bid> specification, Pageable pageable);

    Bid findByAuctionIdAndTop1(Long auctionId, boolean top1);

    Optional<Bid> findByUser_Id(Long id);


}
